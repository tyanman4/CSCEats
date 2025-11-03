package com.example.backend.service;

import java.util.List;

import com.example.backend.entity.User;

public interface CSCEatsService {

    List<User> findAllUser();

    User findByIdUser(Integer user_id);
}