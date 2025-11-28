package com.example.backend.controller;

import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.backend.entity.RequestRestaurants;
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
    public ResponseEntity<String> approve(@PathVariable Integer id) {
        cscEatsService.approveRequestRestaurant(id);
        return ResponseEntity.ok("approved");
    }

}