package com.example.backend.service;

import java.util.List;

import com.example.backend.entity.User;

public interface CSCEatsService {

    List<User> findAllUser();

    User findByIdUser(Integer user_id);

    void insertUser(User user);

    boolean authenticate(String name, String password);

}