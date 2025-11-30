package com.example.backend.entity;

import lombok.Data;

@Data
public class Review {
    private Long reviewId;
    private Long restaurantId;
    private Long userId;
    private Integer rating;
    private String comment;
    private String createdAt;
    private String updatedAt;

    // 追加: ユーザー名フィールド
    private String userName;
}
