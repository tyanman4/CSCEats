package com.example.backend.form;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class PasswordForm {

    @NotBlank(message = "必須")
    @Size(min = 4, message = "短すぎｗ")
    private String password;
}
