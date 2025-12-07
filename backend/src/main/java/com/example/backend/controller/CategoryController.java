package com.example.backend.controller;

import java.util.List;
import java.util.Map;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.backend.service.RestaurantListService;

import lombok.RequiredArgsConstructor;

@RestController
@RequiredArgsConstructor
@CrossOrigin(origins = "http://localhost:5173") // ReactサーバのURL
public class CategoryController {
  
  private final RestaurantListService restaurantListService;

    @GetMapping("/api/categories")
    public List<Map<String, Object>> getCategoriesByUsage() {
        return restaurantListService.findCategoriesByUsage();
    }
}
