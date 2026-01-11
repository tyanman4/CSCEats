package com.example.backend.controller;

import jakarta.validation.Valid;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;

import com.example.backend.entity.User;
import com.example.backend.form.LoginForm;
import com.example.backend.form.UserForm;
import com.example.backend.helper.UserHelper;
import com.example.backend.security.CustomUserDetails;
import com.example.backend.service.UserService;

import lombok.RequiredArgsConstructor;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api")
public class UserController {

    private final UserService userService;
    private final UserHelper userHelper;

    @GetMapping("/user/{id}")
    public ResponseEntity<User> getUser(@PathVariable Integer id) {
        User user = userService.findByIdUser(id);
        return ResponseEntity.ok(user);
    }

    @PostMapping("/login")
    public ResponseEntity<Map<String, String>> login(@Valid @RequestBody LoginForm form) {

        try {
            String token = userService.login(form.getName(), form.getPassword());
            return ResponseEntity.ok(Map.of("token", token));
        } catch (BadCredentialsException e) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(Map.of("error", "Invalid username or password"));
        }

    }

    @PostMapping("/save")
    public ResponseEntity<Map<String, String>> create(@Valid @RequestBody UserForm form) {

        // 既に存在するユーザ名かチェック
        if (userService.checkExistsByName(form.getName())) {
            return ResponseEntity
                    .status(HttpStatus.CONFLICT)// 409
                    .body(Map.of("error", "Username already exists"));
        }
        User user = userHelper.convertUser(form);
        userService.insertUser(user);
        String token = userService.login(form.getName(), form.getPassword());

        return ResponseEntity.ok(Map.of("token", token));
    }

    @GetMapping("/users/me")
    public ResponseEntity<Map<String, Object>> getMyProfile(
            @AuthenticationPrincipal CustomUserDetails userDetails) {
        // @AuthenticationPrincipal で現在ログイン中のユーザ情報を取得
        return ResponseEntity
                .ok(Map.of(
                        "id", userDetails.getUserId(),
                        "name", userDetails.getUsername(),
                        "introduction", userDetails.getIntroduction(),
                        "role", userDetails.getRole()));
    }
}
