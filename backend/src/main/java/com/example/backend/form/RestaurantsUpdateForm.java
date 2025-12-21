package com.example.backend.form;

import org.hibernate.validator.constraints.URL;

import jakarta.validation.constraints.NotBlank;
import lombok.Data;

@Data
public class RestaurantsUpdateForm {

    @NotBlank(message = "店名は必須です。")
    private String name;
    @NotBlank(message = "住所は必須です。")
    private String address;
    private Integer distance;
    @URL(protocol = "https", message = "URL形式が正しくありません。")
    private String url;
    private String averageBudget;
    private String description;
    private String imageUrl;
    private Double latitude;
    private Double longitude;
}
