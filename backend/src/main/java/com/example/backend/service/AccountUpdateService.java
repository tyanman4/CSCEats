package com.example.backend.service;

import org.springframework.stereotype.Service;

import com.example.backend.mapper.UserMapper;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class AccountUpdateService {

    private final UserMapper userMapper;

    public void updateName(String newName, String name) {
        userMapper.updateName(newName, name);
    }

    public void updateIntroduction(String name, String introduction) {
        userMapper.updateIntroduction(name, introduction);
    }

    public void updatePassword(String name, String password) {
        userMapper.updatePassword(name, password);
    };
}
