package com.example.backend.form;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class RequestRestaurantForm {

    @NotBlank(message = "必須")
    @Size(min = 2, message = "短すぎｗ")
    private String name;

    @NotBlank(message = "必須")
    private String address;

    private String description;
}
