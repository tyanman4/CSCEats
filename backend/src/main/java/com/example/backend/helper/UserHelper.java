package com.example.backend.helper;

import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

import com.example.backend.entity.User;
import com.example.backend.form.UserForm;

import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
@Component
public class UserHelper {

    private final PasswordEncoder encoder;

    public User convertUser(UserForm form) {
        User user = new User();
        user.setName(form.getName());
        user.setPassword(encoder.encode(form.getPassword()));
        user.setIntroduction(form.getIntroduction());
        return user;
    }
}
