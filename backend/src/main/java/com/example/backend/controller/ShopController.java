package com.example.backend.controller;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;

@RestController
@CrossOrigin(origins = "http://localhost:3000") // ReactサーバのURL
public class ShopController {

    @GetMapping("/api/restaurants")
    public List<Map<String, Object>> getRestaurants() {
        List<Map<String, Object>> shops = new ArrayList<>();
        shops.add(Map.of("id",1,"name","ラーメン花月","genre","ラーメン"));
        shops.add(Map.of("id",2,"name","カレー幸","genre","カレー"));
        return shops;
    }
}
