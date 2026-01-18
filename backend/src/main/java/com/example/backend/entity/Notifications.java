package com.example.backend.entity;

import java.time.LocalDateTime;

import lombok.Data;

@Data
public class Notifications {
    private Long notificationId;
    private Long userId;
    private String type;
    private Long relatedId;
    private LocalDateTime createdAt;
    private Boolean readFlag;

    private String relatedInfo;
    private String relatedSubInfo;
}
