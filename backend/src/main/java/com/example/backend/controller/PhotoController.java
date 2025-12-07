package com.example.backend.controller;

import jakarta.servlet.http.HttpServletRequest;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import com.example.backend.entity.Photo;
import com.example.backend.service.PhotoService;
import com.example.backend.security.JwtUtil;

import lombok.RequiredArgsConstructor;

@RestController
@RequiredArgsConstructor
@CrossOrigin(origins = "http://localhost:5173")
public class PhotoController {

    private final PhotoService photoService;
    private final JwtUtil jwtUtil;

    @PostMapping("/api/photos")
    public ResponseEntity<?> uploadPhoto(
            @RequestParam("restaurantId") Long restaurantId,
            @RequestParam("file") MultipartFile file,
            HttpServletRequest request
    ) {
        if (file.isEmpty()) {
            return ResponseEntity.badRequest().body("ファイルが選択されていません");
        }

        // JWT から userId 抽出
        String token = request.getHeader("Authorization").substring(7);
        Long userId = jwtUtil.extractUserId(token);

        photoService.savePhoto(restaurantId, null,userId, file);

        return ResponseEntity.ok("写真をアップロードしました");
    }
}
