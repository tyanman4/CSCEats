package com.example.backend.controller;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;

import com.example.backend.entity.User;
import com.example.backend.service.CSCEatsService;

import lombok.RequiredArgsConstructor;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;

@RestController
@RequiredArgsConstructor
@CrossOrigin(origins = "http://localhost:5173") // ReactサーバのURL
public class ShopController {

    private final CSCEatsService cscEatsService;

    @GetMapping("/api/restaurants")
    public List<Map<String, Object>> getRestaurants() {
        List<Map<String, Object>> shops = new ArrayList<>();
        shops.add(Map.of("id", 1, "name", "ラーメン花月", "genre", "ラーメン"));
        shops.add(Map.of("id", 2, "name", "カレー幸", "genre", "カレー"));
        return shops;
    }

    @GetMapping("/api/user/{id}")
    public List<Map<String, Object>> getUser(@PathVariable Integer id) {
        User user = cscEatsService.findByIdUser(id);
        List<Map<String, Object>> users = new ArrayList<>();
        users.add(Map.of("id", user.getUser_id(), "name", user.getName(), "intro", user.getIntroduction()));
        return users;
    }

    @GetMapping("/api/user/")
    public List<Map<String, Object>> getAllUsers() {
        List<User> allUser = cscEatsService.findAllUser();
        List<Map<String, Object>> users = new ArrayList<>();

        for (User user : allUser) {
            users.add(Map.of("id", user.getUser_id(), "name", user.getName(), "intro", user.getIntroduction()));
        }
        return users;
    }
}
