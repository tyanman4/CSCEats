package com.example.backend.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.example.backend.entity.Photo;
import com.example.backend.entity.RequestRestaurants;
import com.example.backend.service.RequestRestaurantService;
import com.example.backend.service.FileStorageService;
import com.example.backend.service.PhotoService;
import com.example.backend.form.RequestRestaurantForm;
import com.example.backend.helper.RequestRestaurantHelper;
import com.example.backend.security.JwtUtil;

import jakarta.servlet.http.HttpServletRequest;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.RequestParam;

import java.util.List;

import org.springframework.http.MediaType;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/request-restaurants")
public class RequestRestaurantController {

    private final RequestRestaurantService requestRestaurantService;
    private final PhotoService photoService;
    private final FileStorageService fileStorageService;
    private final RequestRestaurantHelper requestRestaurantHelper;
    private final JwtUtil jwtUtil;

    @PostMapping(consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public ResponseEntity<?> requestRestaurant(
            @ModelAttribute RequestRestaurantForm form,
            HttpServletRequest request) {
        String bearer = request.getHeader("Authorization");
        System.out.println("AUTH HEADER = " + bearer);
        // JWT から user_id 抽出
        String token = request.getHeader("Authorization").substring(7);
        Long userId = jwtUtil.extractUserId(token);

        // Service 呼び出し
        Long requestRestaurantId = requestRestaurantService.insert(
                form.getName(),
                form.getAddress(),
                form.getUrl(),
                userId);

        if (form.getPhotos() != null && !form.getPhotos().isEmpty()) {
            photoService.savePhotos(null, requestRestaurantId, userId, form.getPhotos());
        }

        return ResponseEntity.ok("OK");
    }

    @GetMapping("/{userId}")
    public ResponseEntity<List<RequestRestaurants>> getByUserId(@PathVariable Long userId) {
        List<RequestRestaurants> list = requestRestaurantService.findByUserId(userId);
        return ResponseEntity.ok(list);
    }

}
