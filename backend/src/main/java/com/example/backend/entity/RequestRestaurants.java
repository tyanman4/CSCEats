package com.example.backend.entity;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class RequestRestaurants {
    private Long requestRestaurantId;
    private Long userId;
    private String userName; // UsersテーブルをJOINしている。
    private String name;
    private String url;
    private String createdAt;
    private String address;
    private String status;
    private Integer approvedRestaurantId;
    private Integer adminUserId;
    private String rejectReason;
    private String updatedAt;
}