package com.example.backend.helper;

import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;

import com.example.backend.entity.User;
import com.example.backend.form.UserForm;

public class UserHelper {

    static BCryptPasswordEncoder encoder = new BCryptPasswordEncoder();

    public static User convertUser(UserForm form) {
        User user = new User();
        user.setName(form.getName());
        user.setPassword(encoder.encode(form.getPassword()));
        user.setIntroduction(form.getIntroduction());
        return user;
    }
}
