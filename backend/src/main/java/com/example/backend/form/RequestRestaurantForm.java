package com.example.backend.form;

import lombok.Data;
import jakarta.validation.constraints.NotBlank;

@Data
public class RequestRestaurantForm {

    @NotBlank(message = "必須")
    private String name;

    @NotBlank(message = "必須")
    private String address;

    private String url;
}
