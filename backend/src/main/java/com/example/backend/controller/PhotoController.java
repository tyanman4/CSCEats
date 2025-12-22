package com.example.backend.controller;

import jakarta.servlet.http.HttpServletRequest;

import java.time.Instant;
import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import com.example.backend.dto.ApiResponseDto;
import com.example.backend.entity.Photo;
import com.example.backend.form.RequestRestaurantForm;
import com.example.backend.service.PhotoService;
import com.example.backend.security.JwtUtil;

import lombok.RequiredArgsConstructor;

@RestController
@RequiredArgsConstructor
@CrossOrigin(origins = "http://localhost:5173")
public class PhotoController {

    private final PhotoService photoService;
    private final JwtUtil jwtUtil;

    @PostMapping("/api/restaurants/{restaurantId}/photos")
    public ResponseEntity<ApiResponseDto<Void>> uploadPhotos(
            @PathVariable Long restaurantId,
            @RequestParam("files") List<MultipartFile> files, // ✅ 複数枚
            HttpServletRequest request) {
        ApiResponseDto<Void> response = new ApiResponseDto<>();
        if (files == null || files.isEmpty()) {
            response.setStatus(400);
            response.setMessage("写真が選択されていません。");
            response.setPath(request.getRequestURI());
            response.setTimestamp(Instant.now().toString());
            return ResponseEntity.badRequest().body(response);
        }

        if (files.size() > 5) {

            response.setStatus(400);
            response.setMessage("一度にアップロードできる写真は最大5枚までです");
            response.setPath(request.getRequestURI());
            response.setTimestamp(Instant.now().toString());
            return ResponseEntity.badRequest().body(response);
        }

        String token = request.getHeader("Authorization").substring(7);
        Long userId = jwtUtil.extractUserId(token);

        photoService.savePhotos(restaurantId, null, userId, files);

        response.setStatus(201);
        response.setMessage("写真をアップロードしました。");
        response.setPath(request.getRequestURI());
        response.setTimestamp(Instant.now().toString());
        return ResponseEntity.ok(response);
    }
}
