package com.example.backend.controller;

import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;

import jakarta.validation.Valid;

import org.springframework.core.io.ClassPathResource;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.io.InputStream;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;

import com.example.backend.entity.User;
import com.example.backend.form.LoginForm;
import com.example.backend.form.UserForm;
import com.example.backend.helper.UserHelper;
import com.example.backend.security.CustomUserDetails;
import com.example.backend.service.CSCEatsService;

import lombok.RequiredArgsConstructor;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@RestController
@RequiredArgsConstructor
@CrossOrigin(origins = "http://localhost:5173") // ReactサーバのURL
public class ShopController {

    private final CSCEatsService cscEatsService;
    private final ObjectMapper objectMapper = new ObjectMapper();
    private final UserHelper userHelper;

    @GetMapping("/api/restaurants")
    public List<Map<String, Object>> getRestaurants(@RequestParam Map<String, String> params) {
        try {
            // resources/data/restaurants.json を読み込み
            ClassPathResource resource = new ClassPathResource("data/restaurants.json");
            InputStream inputStream = resource.getInputStream();
            // JSON → List<Map<String, Object>> に変換
            List<Map<String, Object>> shops = objectMapper.readValue(
                    inputStream,
                    new TypeReference<List<Map<String, Object>>>() {
                    });
            System.out.println("受け取ったパラメータ: " + params);
            return shops;
        } catch (Exception e) {
            e.printStackTrace();
            throw new RuntimeException("JSONファイルの読み込みに失敗しました");
        }
    }

    @GetMapping("/api/user/{id}")
    public List<Map<String, Object>> getUser(@PathVariable Integer id) {
        User user = cscEatsService.findByIdUser(id);
        List<Map<String, Object>> users = new ArrayList<>();
        users.add(Map.of("id", user.getUser_id(), "name", user.getName(), "intro", user.getIntroduction()));
        return users;
    }

    @GetMapping("/api/user/")
    public List<Map<String, Object>> getAllUsers() {
        List<User> allUser = cscEatsService.findAllUser();
        List<Map<String, Object>> users = new ArrayList<>();

        for (User user : allUser) {
            users.add(Map.of("id", user.getUser_id(), "name", user.getName(), "intro", user.getIntroduction()));
        }
        return users;
    }

    @PostMapping("/api/login")
    public ResponseEntity<?> login(@Valid @RequestBody LoginForm form) {

        try {
            String token = cscEatsService.login(form.getName(), form.getPassword());
            return ResponseEntity.ok(Map.of("token", token));
        } catch (BadCredentialsException e) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(Map.of("error", "Invalid username or password"));
        }

    }

    @PostMapping("/api/save")
    public ResponseEntity<?> create(@Valid @RequestBody UserForm form) {

        // 既に存在するユーザ名かチェック
        if (cscEatsService.checkExistsByName(form.getName())) {
            return ResponseEntity
                    .status(HttpStatus.CONFLICT)
                    .body(Map.of("error", "Username already exists"));
        }
        User user = userHelper.convertUser(form);
        cscEatsService.insertUser(user);
        String token = cscEatsService.login(form.getName(), form.getPassword());

        Map<String, String> response = new HashMap<>();
        response.put("redirect", "/restaurants");
        response.put("token", token);
        return ResponseEntity.ok(response);
    }

    @GetMapping("/api/users/me")
    public ResponseEntity<?> getMyProfile(@AuthenticationPrincipal CustomUserDetails userDetails) {
        // @AuthenticationPrincipal で現在ログイン中のユーザ情報を取得
        // rolesもあとで加える。
        return ResponseEntity
                .ok(Map.of("name", userDetails.getUsername(), "introduction", userDetails.getIntroduction()));
    }

    @ExceptionHandler(MethodArgumentNotValidException.class)
    public ResponseEntity<String> handleValidationException(MethodArgumentNotValidException ex) {
        String errorMsg = ex.getBindingResult()
                .getFieldErrors()
                .stream()
                .map(e -> e.getField() + ": " + e.getDefaultMessage())
                .collect(Collectors.joining(", "));
        return ResponseEntity.badRequest().body(errorMsg);
    }

}
