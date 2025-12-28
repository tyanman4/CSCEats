package com.example.backend.controller;

import com.example.backend.service.ReviewService;
import com.example.backend.dto.ApiResponseDto;
import com.example.backend.dto.ReviewRequestDto;
import com.example.backend.security.JwtUtil;
import lombok.RequiredArgsConstructor;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.validation.Valid;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
public class ReviewController {

    private final ReviewService reviewService;
    private final JwtUtil jwtUtil;

    @PostMapping("/api/{restaurantId}/reviews")
    public ResponseEntity<ApiResponseDto<Void>> submitReview(

            @Valid @RequestBody ReviewRequestDto dto,
            HttpServletRequest request) {
        if (request.getHeader("Authorization") == null) {
            return ResponseEntity.status(401).build();
        }
        String token = request.getHeader("Authorization").substring(7);
        Long userId = jwtUtil.extractUserId(token);

        reviewService.insert(dto, userId);

        ApiResponseDto<Void> response = new ApiResponseDto<>();
        response.setStatus(201);
        response.setMessage("レビューを登録しました。");
        response.setPath(request.getRequestURI());
        response.setTimestamp(java.time.Instant.now().toString());
        return ResponseEntity.created(null).body(response);
    }
}