package com.example.backend.controller;

import java.util.List;
import java.util.Map;

import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.backend.entity.RequestRestaurants;
import com.example.backend.security.CustomUserDetails;
import com.example.backend.service.RequestHandlingService;

import lombok.RequiredArgsConstructor;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/admin")
public class RequestHandlingController {

    private final RequestHandlingService requestHandlingService;

    @GetMapping("pending")
    public List<RequestRestaurants> getRequests() {
        List<RequestRestaurants> requestRestaurantsList = requestHandlingService.findPendingRequestRestaurants();
        return requestRestaurantsList;
    }

    @PostMapping("approve/{id}")
    public ResponseEntity<String> approve(@PathVariable Long id,
            @RequestBody Map<String, String> body,
            @AuthenticationPrincipal CustomUserDetails userDetails) {
        Long userId = Long.parseLong(body.get("userId"));
        requestHandlingService.approveRequestRestaurant(id, userDetails.getUserId(), userId);
        return ResponseEntity.ok("approved");
    }

    @PostMapping("reject/{id}")
    public ResponseEntity<String> reject(@PathVariable Long id,
            @RequestBody Map<String, String> body,
            @AuthenticationPrincipal CustomUserDetails userDetails) {

        Long userId = Long.parseLong(body.get("userId"));
        String reason = body.get("reason");
        requestHandlingService.rejectRequestRestaurant(id, userDetails.getUserId(), reason, userId);
        return ResponseEntity.ok("rejected");
    }

    @PostMapping("approve/photo/{id}")
    public ResponseEntity<String> approvePhoto(@PathVariable Long id,
            @RequestBody Map<String, String> body) {
        Long userId = Long.parseLong(body.get("userId"));
        String imageUrl = body.get("imageUrl");
        String environment = body.get("environment");
        requestHandlingService.approvePhoto(id, userId, imageUrl, environment);
        return ResponseEntity.ok("approved");
    }

    @PostMapping("reject/photo/{id}")
    public ResponseEntity<String> rejectPhoto(@PathVariable Long id,
            @RequestBody Map<String, String> body) {

        Long userId = Long.parseLong(body.get("userId"));
        String reason = body.get("reason");
        String imageUrl = body.get("imageUrl");
        String environment = body.get("environment");
        requestHandlingService.rejectPhoto(id, reason, userId, imageUrl, environment);
        return ResponseEntity.ok("rejected");
    }

    @PatchMapping("answer/inquiry/{id}")
    public ResponseEntity<String> answerInquiry(@PathVariable Long id,
            @RequestBody Map<String, String> body,
            @AuthenticationPrincipal CustomUserDetails userDetails) {
        Long userId = Long.parseLong(body.get("userId"));
        String answer = body.get("answer");
        requestHandlingService.answerInquiry(id, answer, userDetails.getUserId(), userId);
        return ResponseEntity.ok("answered");
    }
}