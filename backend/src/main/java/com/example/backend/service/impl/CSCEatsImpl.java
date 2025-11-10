package com.example.backend.service.impl;

import java.util.List;

import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.example.backend.entity.User;
import com.example.backend.mapper.UserMapper;
import com.example.backend.security.JwtUtil;
import com.example.backend.service.CSCEatsService;

import lombok.RequiredArgsConstructor;

@Service
@Transactional
@RequiredArgsConstructor
public class CSCEatsImpl implements CSCEatsService {

    /** DI */
    private final UserMapper userMapper;
    private final JwtUtil jwtUtil;
    private final AuthenticationManager authManager;

    @Override
    public List<User> findAllUser() {
        return userMapper.selectAll();
    }

    @Override
    public User findByIdUser(Integer id) {
        return userMapper.selectById(id);
    }

    @Override
    public void insertUser(User user) {
        userMapper.insert(user);
    }

    @Override
    public String login(String username, String password) {
        authManager.authenticate(new UsernamePasswordAuthenticationToken(username, password));
        return jwtUtil.generateToken(new org.springframework.security.core.userdetails.User(username, password,
                java.util.Collections.emptyList()));
    }
}
