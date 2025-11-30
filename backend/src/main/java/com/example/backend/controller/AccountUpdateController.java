package com.example.backend.controller;

import java.util.Map;
import java.util.stream.Collectors;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.example.backend.form.IntroductionForm;
import com.example.backend.form.LoginForm;
import com.example.backend.form.PasswordForm;
import com.example.backend.helper.UserHelper;
import com.example.backend.security.CustomUserDetails;
import com.example.backend.service.AccountUpdateService;
import com.example.backend.service.CSCEatsService;

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;

@RestController
@RequiredArgsConstructor
@CrossOrigin(origins = "http://localhost:5173")
public class AccountUpdateController {

    private final CSCEatsService cscEatsService;
    private final UserHelper userHelper;
    private final AccountUpdateService accountUpdateService;

    @PostMapping("/api/update/introduction")
    public ResponseEntity<?> introductionUpdate(@Valid @RequestBody IntroductionForm form,
            @AuthenticationPrincipal CustomUserDetails userDetails) {
        accountUpdateService.updateIntroduction(userDetails.getUsername(), form.getIntroduction());
        return ResponseEntity.ok(Map.of("msg", "introduction has changed"));
    }

    @PostMapping("/api/update/password")
    public ResponseEntity<?> passwordUpdate(@Valid @RequestBody PasswordForm form,
            @AuthenticationPrincipal CustomUserDetails userDetails) {
        String encodedPass = userHelper.encode(form.getPassword());
        accountUpdateService.updatePassword(userDetails.getUsername(), encodedPass);
        return ResponseEntity.ok(Map.of("msg", "introduction has changed"));
    }

    @PostMapping("/api/update/name")
    public ResponseEntity<?> nameUpdate(@Valid @RequestBody LoginForm form,
            @AuthenticationPrincipal CustomUserDetails userDetails) {
        // 既に存在するユーザ名かチェック
        if (cscEatsService.checkExistsByName(form.getName())) {
            return ResponseEntity
                    .status(HttpStatus.CONFLICT)
                    .body(Map.of("error", "Username already exists"));
        }
        accountUpdateService.updateName(form.getName(), userDetails.getUsername());
        String token = cscEatsService.login(form.getName(), form.getPassword());
        return ResponseEntity.ok(Map.of("token", token, "msg", "introduction has changed"));

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
