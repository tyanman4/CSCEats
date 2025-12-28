package com.example.backend.controller;

import java.time.Instant;
import java.util.List;
import java.util.Map;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;

import com.example.backend.dto.ApiResponseDto;
import com.example.backend.dto.CategoryDto;
import com.example.backend.service.RestaurantListService;
import com.example.backend.service.RestaurantCategoryService;

import jakarta.servlet.http.HttpServletRequest;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;

@RestController
@RequiredArgsConstructor
public class CategoryController {

        private final RestaurantListService restaurantListService;
        private final RestaurantCategoryService restaurantCategoryService;

        @GetMapping("/api/categories")
        public ResponseEntity<ApiResponseDto<List<Map<String, Object>>>> getCategoriesByUsage(
                        HttpServletRequest request) {

                List<Map<String, Object>> categories = restaurantListService.findCategoriesByUsage();

                ApiResponseDto<List<Map<String, Object>>> response = new ApiResponseDto<>(
                                200,
                                "カテゴリ一覧を取得しました",
                                request.getRequestURI(),
                                Instant.now().toString(),
                                categories);

                return ResponseEntity.ok(response);
        }

        @PostMapping("/api/{restaurantId}/categories")
        public ResponseEntity<ApiResponseDto<Void>> addCategory(
                        @PathVariable Long restaurantId,
                        @RequestBody CategoryDto request,
                        HttpServletRequest servletRequest) {

                restaurantCategoryService.addCategoriesToRestaurant(
                                restaurantId,
                                request.getCategories());

                ApiResponseDto<Void> response = new ApiResponseDto<>(
                                200,
                                "カテゴリを追加しました",
                                servletRequest.getRequestURI(),
                                Instant.now().toString(),
                                null);

                return ResponseEntity.ok(response);
        }

}
