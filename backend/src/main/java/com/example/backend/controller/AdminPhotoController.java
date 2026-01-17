package com.example.backend.controller;

import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.backend.entity.Photo;
import com.example.backend.service.PhotoService;

import lombok.RequiredArgsConstructor;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/admin/photo")
public class AdminPhotoController {

    private final PhotoService photoService;

    @GetMapping("/pending")
    public ResponseEntity<List<Photo>> getPending() {
        return ResponseEntity.ok(photoService.getByStatus("pending"));
    }

    @GetMapping("/restaurant/{restaurantId}")
    public ResponseEntity<List<Photo>> getByRestaurantId(@PathVariable Long restaurantId) {
        return ResponseEntity.ok(photoService.getApprovedByRestaurantId(restaurantId));
    }
}
