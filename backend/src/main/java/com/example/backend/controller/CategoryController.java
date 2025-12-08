package com.example.backend.controller;

import java.util.List;
import java.util.Map;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;

import com.example.backend.dto.CategoryDto;
import com.example.backend.service.RestaurantListService;
import com.example.backend.service.RestaurantCategoryService;

import jakarta.servlet.http.HttpServletRequest;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;

@RestController
@RequiredArgsConstructor
@CrossOrigin(origins = "http://localhost:5173") // ReactサーバのURL
public class CategoryController {

    private final RestaurantListService restaurantListService;
    private final RestaurantCategoryService restaurantCategoryService;

    @GetMapping("/api/categories")
    public List<Map<String, Object>> getCategoriesByUsage() {
        return restaurantListService.findCategoriesByUsage();
    }

    @PostMapping("/api/restaurants/{restaurantId}/categories")
    public ResponseEntity<?> addCategory(
            @PathVariable Long restaurantId,
            @RequestBody CategoryDto request) {
        restaurantCategoryService.addCategoriesToRestaurant(
                restaurantId,
                request.getCategories());
        return ResponseEntity.ok().build();
    }

}
