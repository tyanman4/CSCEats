package com.example.backend.controller;

import jakarta.servlet.http.HttpServletRequest;

import java.time.Instant;
import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import com.example.backend.dto.ApiResponseDto;
import com.example.backend.dto.PhotoUrlsDto;
import com.example.backend.entity.Photo;
import com.example.backend.service.PhotoService;
import com.example.backend.security.JwtUtil;

import lombok.RequiredArgsConstructor;

@RestController
@RequiredArgsConstructor
public class PhotoController {

    private final PhotoService photoService;
    private final JwtUtil jwtUtil;

    @PostMapping("/api/restaurants/{status}/{restaurantId}/photos")
    public ResponseEntity<ApiResponseDto<Void>> uploadPhotos(
            @PathVariable Long restaurantId,
            @PathVariable String status,
            @RequestBody PhotoUrlsDto photoUrlsDto,
            HttpServletRequest request) {
        ApiResponseDto<Void> response = new ApiResponseDto<>();
        List<String> imageUrls = photoUrlsDto.getImageUrls();
        if (imageUrls == null || imageUrls.isEmpty()) {
            response.setStatus(400);
            response.setMessage("写真が選択されていません。");
            response.setPath(request.getRequestURI());
            response.setTimestamp(Instant.now().toString());
            return ResponseEntity.badRequest().body(response);
        }

        if (imageUrls.size() > 5) {

            response.setStatus(400);
            response.setMessage("一度にアップロードできる写真は最大5枚までです");
            response.setPath(request.getRequestURI());
            response.setTimestamp(Instant.now().toString());
            return ResponseEntity.badRequest().body(response);
        }

        String token = request.getHeader("Authorization").substring(7);
        Long userId = jwtUtil.extractUserId(token);

        if (status.equals("approved")) {
            photoService.savePhotoUrls(restaurantId, null, userId, imageUrls);
        } else if (status.equals("pending")) {
            photoService.savePhotoUrls(null, restaurantId, userId, imageUrls);
        } else {
            response.setStatus(400);
            response.setMessage("不正なステータスです。");
            response.setPath(request.getRequestURI());
            response.setTimestamp(Instant.now().toString());
            return ResponseEntity.badRequest().body(response);
        }
        photoService.savePhotoUrls(null, restaurantId, userId, imageUrls);

        response.setStatus(201);
        response.setMessage("写真をアップロードしました。");
        response.setPath(request.getRequestURI());
        response.setTimestamp(Instant.now().toString());
        return ResponseEntity.ok(response);
    }
}
