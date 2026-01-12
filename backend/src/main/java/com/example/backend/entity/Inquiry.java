package com.example.backend.entity;

import lombok.Data;

@Data
public class Inquiry {
    private Long inquiryId;
    private Long userId;
    private String subject;
    private String message;
    private String status;
    private String answer;
    private Long adminUserId;
    private String createdAt;
    private String updatedAt;
}
