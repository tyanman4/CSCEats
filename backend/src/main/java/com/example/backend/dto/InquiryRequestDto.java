package com.example.backend.dto;

import jakarta.validation.constraints.*;
import lombok.Data;

@Data
public class InquiryRequestDto {

    @NotBlank
    @Size(min = 2)
    private String subject;

    @NotBlank
    @Size(min = 10)
    private String message;
}
