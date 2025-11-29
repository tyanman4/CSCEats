package com.example.backend.controller;

import java.util.List;
import java.util.Map;

import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.backend.entity.RequestRestaurants;
import com.example.backend.security.CustomUserDetails;
import com.example.backend.service.CSCEatsService;

import lombok.RequiredArgsConstructor;

@RestController
@RequiredArgsConstructor
@CrossOrigin(origins = "http://localhost:5173")
@RequestMapping("/api/admin")
public class ForAdminController {
    private final CSCEatsService cscEatsService;

    @PostMapping("pending-list")
    public List<RequestRestaurants> getRequests() {
        List<RequestRestaurants> requestRestaurantsList = cscEatsService.findPendingRequestRestaurants();
        return requestRestaurantsList;
    }

    @PostMapping("approve/{id}")
    public ResponseEntity<String> approve(@PathVariable Integer id,
            @AuthenticationPrincipal CustomUserDetails userDetails) {
        cscEatsService.approveRequestRestaurant(id, userDetails.getUserId());
        return ResponseEntity.ok("approved");
    }

    @PostMapping("reject/{id}")
    public ResponseEntity<String> reject(@PathVariable Integer id,
            @RequestBody Map<String, String> body,
            @AuthenticationPrincipal CustomUserDetails userDetails) {

        String reason = body.get("reason");
        cscEatsService.rejectRequestRestaurant(id, userDetails.getUserId(), reason);
        return ResponseEntity.ok("rejected");
    }

}