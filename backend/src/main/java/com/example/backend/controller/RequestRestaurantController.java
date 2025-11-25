package com.example.backend.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.example.backend.entity.RequestRestaurant;
import com.example.backend.service.CSCEatsService;
import com.example.backend.form.RequestRestaurantForm;
import com.example.backend.helper.RequestRestaurantHelper;
import com.example.backend.security.JwtUtil;

import jakarta.servlet.http.HttpServletRequest;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.http.MediaType;


@RestController
@RequiredArgsConstructor
@CrossOrigin(origins = "http://localhost:5173")
public class RequestRestaurantController {

    private final CSCEatsService cscEatsService;
    private final RequestRestaurantHelper requestRestaurantHelper;
    private final JwtUtil jwtUtil;

    @GetMapping("/api/request-restaurants")
    public String getRequestRestaurantForUser(@RequestParam(required = false) String param) {
        return new String();
    }
    
    @PostMapping(value = "/api/request-restaurants", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public ResponseEntity<?> requestRestaurant(
        @ModelAttribute RequestRestaurantForm form,
        HttpServletRequest request
    ) {
        // JWT から user_id 抽出
        String token = request.getHeader("Authorization").substring(7);
        Long userId = jwtUtil.extractUserId(token);

        // Service 呼び出し
        cscEatsService.insert(
            form.getName(),
            form.getAddress(),
            form.getUrl(),
            userId
        );

        return ResponseEntity.ok("OK");
    }

    
    @GetMapping("/api/admin/request-restaurants")
    public String getRequestRestaurantForAdmin(@RequestParam(required = false) String param) {
        return new String();
    }

    @PatchMapping("/api/admin/request-restaurants/{id}/reject")
    public ResponseEntity<?> patchRejectRequestRestaurant(@PathVariable Long id) {
        return ResponseEntity.ok().build();
    }

    @PatchMapping("/api/admin/request-restaurants/{id}/approve")
    public ResponseEntity<?> patchApproveRequestRestaurant(@PathVariable Long id) {
        return ResponseEntity.ok().build();
    }
}
