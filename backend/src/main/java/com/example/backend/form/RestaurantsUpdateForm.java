package com.example.backend.form;

import org.hibernate.validator.constraints.URL;

import jakarta.validation.constraints.NotBlank;
import lombok.Data;

@Data
public class RestaurantsUpdateForm {

    @NotBlank
    private String name;
    @NotBlank
    private String address;
    private Integer distance;
    @URL
    private String url;
    private String averageBudget;
    private String description;
    private String imageUrl;
    private Double latitude;
    private Double longitude;
}
