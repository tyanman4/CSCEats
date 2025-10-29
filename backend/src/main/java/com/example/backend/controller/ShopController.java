package com.example.backend.controller;

import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.core.io.ClassPathResource;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.io.InputStream;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;

@RestController
// TODO: サーバーが準備できたら変更
@CrossOrigin(origins = "http://localhost:5173") 
public class ShopController {
     private final ObjectMapper objectMapper = new ObjectMapper();
     // GETリクエストで"/api/restaurants"が呼ばれたら
    @GetMapping("/api/restaurants")
    public List<Map<String, Object>> getRestaurants(@RequestParam Map<String, String> params)
    {
        try {
            // resources/data/restaurants.json を読み込み
            ClassPathResource resource = new ClassPathResource("data/restaurants.json");
            InputStream inputStream = resource.getInputStream();
            // JSON → List<Map<String, Object>> に変換
            List<Map<String, Object>> shops = objectMapper.readValue(
                    inputStream,
                    new TypeReference<List<Map<String, Object>>>() {}
            );
            System.out.println("受け取ったパラメータ: " + params);
            return shops;
        } catch (Exception e) {
            e.printStackTrace();
            throw new RuntimeException("JSONファイルの読み込みに失敗しました");
        }
    }
}
