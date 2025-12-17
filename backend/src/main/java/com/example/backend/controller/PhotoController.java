package com.example.backend.controller;

import jakarta.servlet.http.HttpServletRequest;

import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

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
    public ResponseEntity<?> uploadPhotos(
            @PathVariable Long restaurantId,
            @RequestParam("files") List<MultipartFile> files, // ✅ 複数枚
            HttpServletRequest request) {
        if (files == null || files.isEmpty()) {
            return ResponseEntity.badRequest().body("ファイルが選択されていません");
        }

        if (files.size() > 5) {
            return ResponseEntity.badRequest().body("一度にアップロードできる写真は最大5枚までです");
        }

        String token = request.getHeader("Authorization").substring(7);
        Long userId = jwtUtil.extractUserId(token);

        photoService.savePhotos(restaurantId, null, userId, files);

        return ResponseEntity.ok("写真をアップロードしました");
    }
}
