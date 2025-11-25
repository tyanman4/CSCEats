package com.example.backend.entity;

import lombok.Data;
import java.time.LocalDateTime;

@Data
public class RequestRestaurant {
    private Long requestRestaurantId;
    private String name;
    private String address;
    private String url;
    private Long userId;
    private String reason;
    private String status; // pending / approved / rejected
    private String rejectReason; 
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;
}