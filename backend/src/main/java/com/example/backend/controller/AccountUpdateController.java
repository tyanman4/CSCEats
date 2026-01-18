package com.example.backend.controller;

import java.util.Map;
import java.util.stream.Collectors;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.backend.form.IntroductionForm;
import com.example.backend.form.LoginForm;
import com.example.backend.form.PasswordForm;
import com.example.backend.helper.UserHelper;
import com.example.backend.security.CustomUserDetails;
import com.example.backend.service.AccountUpdateService;
import com.example.backend.service.UserService;

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/update")
public class AccountUpdateController {

    private final UserService userService;
    private final UserHelper userHelper;
    private final AccountUpdateService accountUpdateService;

    @PostMapping("/introduction")
    public ResponseEntity<?> introductionUpdate(@Valid @RequestBody IntroductionForm form,
            @AuthenticationPrincipal CustomUserDetails userDetails) {
        accountUpdateService.updateIntroduction(userDetails.getUsername(), form.getIntroduction());
        return ResponseEntity.ok(Map.of("msg", "introduction has changed"));
    }

    @PostMapping("/password")
    public ResponseEntity<?> passwordUpdate(@Valid @RequestBody PasswordForm form,
            @AuthenticationPrincipal CustomUserDetails userDetails) {
        String encodedPass = userHelper.encode(form.getPassword());
        accountUpdateService.updatePassword(userDetails.getUsername(), encodedPass);
        return ResponseEntity.ok(Map.of("msg", "introduction has changed"));
    }

    @PostMapping("/name")
    public ResponseEntity<?> nameUpdate(@Valid @RequestBody LoginForm form,
            @AuthenticationPrincipal CustomUserDetails userDetails) {
        // 既に存在するユーザ名かチェック
        if (userService.checkExistsByName(form.getName())) {
            return ResponseEntity
                    .status(HttpStatus.CONFLICT)
                    .body(Map.of("error", "Username already exists"));
        }
        accountUpdateService.updateName(form.getName(), userDetails.getUsername());
        String token = userService.login(form.getName(), form.getPassword());
        return ResponseEntity.ok(Map.of("token", token, "msg", "introduction has changed"));

    }
}
