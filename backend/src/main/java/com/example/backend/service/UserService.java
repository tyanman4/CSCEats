package com.example.backend.service;

import java.util.Optional;

import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.example.backend.entity.User;
import com.example.backend.mapper.UserMapper;
import com.example.backend.security.JwtUtil;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class UserService {

    private final UserMapper userMapper;
    private final AuthenticationManager authManager;
    private final JwtUtil jwtUtil;

    public boolean checkExistsByName(String name) {
        return userMapper.countByName(name) > 0;
    }

    @Transactional
    public void insertUser(User user) {
        userMapper.insert(user);
    }

    public String login(String username, String password) {
        Authentication authentication = authManager
                .authenticate(new UsernamePasswordAuthenticationToken(username, password));
        UserDetails user = (UserDetails) authentication.getPrincipal();
        return jwtUtil.generateToken(user);
    }

    public User findByIdUser(Integer id) {
        return userMapper.selectById(id);
    }

    public Optional<User> findByName(String name) {
        return userMapper.findByName(name);
    }

}
