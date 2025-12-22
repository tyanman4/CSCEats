package com.example.backend.controller;

import com.example.backend.service.RestaurantsLikesService;
import com.example.backend.dto.ApiResponseDto;
import com.example.backend.security.JwtUtil;
import lombok.RequiredArgsConstructor;
import jakarta.servlet.http.HttpServletRequest;

import java.time.Instant;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.CrossOrigin;

@RestController
@RequestMapping("/api/restaurants/{restaurantId}/likes")
@CrossOrigin(origins = "http://localhost:5173") // ReactサーバのURL
@RequiredArgsConstructor
public class RestaurantLikeController {

    private final RestaurantsLikesService restaurantsLikesService;
    private final JwtUtil jwtUtil;

    @PostMapping
    public ResponseEntity<ApiResponseDto<Void>> likeRestaurant(
            @PathVariable Long restaurantId,
            HttpServletRequest request) {
        String authHeader = request.getHeader("Authorization");
        if (authHeader == null || !authHeader.startsWith("Bearer ")) {
            return ResponseEntity.status(401)
                    .body(new ApiResponseDto<>(
                            401,
                            "認証が必要です",
                            request.getRequestURI(),
                            Instant.now().toString(),
                            null));
        }

        String token = authHeader.substring(7);
        Long userId = jwtUtil.extractUserId(token);

        restaurantsLikesService.addLike(restaurantId, userId);

        ApiResponseDto<Void> response = new ApiResponseDto<>(
                201,
                "いいねしました",
                request.getRequestURI(),
                Instant.now().toString(),
                null);

        return ResponseEntity.status(HttpStatus.CREATED).body(response);
    }

    @DeleteMapping
    public ResponseEntity<ApiResponseDto<Void>> unlikeRestaurant(
            @PathVariable Long restaurantId,
            HttpServletRequest request) {
        String authHeader = request.getHeader("Authorization");
        if (authHeader == null || !authHeader.startsWith("Bearer ")) {
            return ResponseEntity.status(401)
                    .body(new ApiResponseDto<>(
                            401,
                            "認証が必要です",
                            request.getRequestURI(),
                            Instant.now().toString(),
                            null));
        }

        String token = authHeader.substring(7);
        Long userId = jwtUtil.extractUserId(token);

        restaurantsLikesService.removeLike(restaurantId, userId);

        ApiResponseDto<Void> response = new ApiResponseDto<>(
                200,
                "いいねを解除しました",
                request.getRequestURI(),
                Instant.now().toString(),
                null);

        return ResponseEntity.ok(response);
    }
}