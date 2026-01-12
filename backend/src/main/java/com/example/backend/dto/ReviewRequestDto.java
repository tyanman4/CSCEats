package com.example.backend.dto;

import jakarta.validation.constraints.*;
import lombok.Data;

@Data
public class ReviewRequestDto {

    @NotNull
    private Long restaurantId;

    @NotNull
    @Min(1)
    @Max(5)
    private Integer rating;

    @Size(max = 200)
    private String comment;
}
