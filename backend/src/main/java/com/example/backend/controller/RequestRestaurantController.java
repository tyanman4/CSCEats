package com.example.backend.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.backend.dto.ApiResponseDto;
import com.example.backend.entity.RequestRestaurants;
import com.example.backend.service.RequestRestaurantService;
import com.example.backend.service.PhotoService;
import com.example.backend.form.RequestRestaurantForm;
import com.example.backend.security.JwtUtil;

import jakarta.servlet.http.HttpServletRequest;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PathVariable;

import java.time.Instant;
import java.util.Map;

import org.springframework.http.HttpStatus;

import java.util.List;

import org.springframework.http.MediaType;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/request-restaurants")
public class RequestRestaurantController {

        private final RequestRestaurantService requestRestaurantService;
        private final PhotoService photoService;
        private final JwtUtil jwtUtil;

        @PostMapping(consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
        public ResponseEntity<ApiResponseDto<Map<String, Long>>> requestRestaurant(
                        @ModelAttribute @Valid RequestRestaurantForm form,
                        HttpServletRequest request) { // --- JWT から userId 抽出 ---
                String authHeader = request.getHeader("Authorization");
                String token = authHeader.substring(7);
                Long userId = jwtUtil.extractUserId(token);

                // --- Service 呼び出し ---
                Long requestRestaurantId = requestRestaurantService.insert(
                                form.getName(),
                                form.getAddress(),
                                form.getUrl(),
                                userId);

                if (form.getPhotos() != null && !form.getPhotos().isEmpty()) {
                        photoService.savePhotos(
                                        null,
                                        requestRestaurantId,
                                        userId,
                                        form.getPhotos());
                }

                ApiResponseDto<Map<String, Long>> response = new ApiResponseDto<>(
                                201,
                                "レストランリクエストを送信しました",
                                request.getRequestURI(),
                                Instant.now().toString(),
                                Map.of("requestRestaurantId", requestRestaurantId));

                return ResponseEntity.status(HttpStatus.CREATED).body(response);
        }

        @GetMapping("/{userId}")
        public ResponseEntity<List<RequestRestaurants>> getByUserId(@PathVariable Long userId) {
                List<RequestRestaurants> list = requestRestaurantService.findByUserId(userId);
                return ResponseEntity.ok(list);
        }

}
