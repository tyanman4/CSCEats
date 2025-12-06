package com.example.backend.controller;

import com.example.backend.service.RestaurantsLikesService;
import com.example.backend.security.JwtUtil;
import lombok.RequiredArgsConstructor;
import jakarta.servlet.http.HttpServletRequest;
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
    public ResponseEntity<Void> likeRestaurant(
            @PathVariable Long restaurantId, 
            HttpServletRequest request
    ) {
        if (request.getHeader("Authorization") == null) {
            return ResponseEntity.status(401).build(); // Unauthorized
        }
        String token = request.getHeader("Authorization").substring(7);
        Long userId = jwtUtil.extractUserId(token);
        restaurantsLikesService.addLike(restaurantId, userId);
        return ResponseEntity.ok().build();
    }

    @DeleteMapping
    public ResponseEntity<Void> unlikeRestaurant(
            @PathVariable Long restaurantId,
            HttpServletRequest request
    ) {
         if (request.getHeader("Authorization") == null) {
            return ResponseEntity.status(401).build(); // Unauthorized
        }
        String token = request.getHeader("Authorization").substring(7);
        Long userId = jwtUtil.extractUserId(token);
        restaurantsLikesService.removeLike(restaurantId, userId);
        return ResponseEntity.ok().build();
    }
}