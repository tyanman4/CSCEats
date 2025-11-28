package com.example.backend.entity;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class RequestRestaurants {
    private int requestRestaurantId;
    private int userId;
    private String userName; //UsersテーブルをJOINしている。
    private String name;
    private String url;
    private String createdAt;
    private String address;
    private String status;
    private int approvedRestaurantId;
    private int adminUserId;
    private String rejectReason;
    private String updatedAt;
}