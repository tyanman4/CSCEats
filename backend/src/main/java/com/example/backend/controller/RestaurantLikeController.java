package com.example.backend.controller;

import com.example.backend.service.RestaurantsLikesService;
import com.example.backend.entity.RestaurantsLikes;
import com.example.backend.security.JwtUtil;
import lombok.RequiredArgsConstructor;
import jakarta.servlet.http.HttpServletRequest;

import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
public class RestaurantLikeController {

    private final RestaurantsLikesService restaurantsLikesService;
    private final JwtUtil jwtUtil;

    @PostMapping("/api/restaurants/{restaurantId}/likes")
    public ResponseEntity<Void> likeRestaurant(
            @PathVariable Long restaurantId,
            HttpServletRequest request) {
        if (request.getHeader("Authorization") == null) {
            return ResponseEntity.status(401).build(); // Unauthorized
        }
        String token = request.getHeader("Authorization").substring(7);
        Long userId = jwtUtil.extractUserId(token);
        restaurantsLikesService.addLike(restaurantId, userId);
        return ResponseEntity.ok().build();
    }

    @DeleteMapping("/api/restaurants/{restaurantId}/likes")
    public ResponseEntity<Void> unlikeRestaurant(
            @PathVariable Long restaurantId,
            HttpServletRequest request) {
        if (request.getHeader("Authorization") == null) {
            return ResponseEntity.status(401).build(); // Unauthorized
        }
        String token = request.getHeader("Authorization").substring(7);
        Long userId = jwtUtil.extractUserId(token);
        restaurantsLikesService.removeLike(restaurantId, userId);
        return ResponseEntity.ok().build();
    }

    @GetMapping("/api/restaurantLikes/user/{userId}")
    public ResponseEntity<List<RestaurantsLikes>> getByUserId(@PathVariable Long userId) {
        return ResponseEntity.ok(restaurantsLikesService.findByUserId(userId));
    }
}