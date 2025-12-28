package com.example.backend.form;

import lombok.Data;
import jakarta.validation.constraints.NotBlank;

import java.util.List;

import org.springframework.web.multipart.MultipartFile;

@Data
public class RequestRestaurantForm {

    @NotBlank(message = "必須")
    private String name;

    @NotBlank(message = "必須")
    private String address;

    private String url;

    private List<MultipartFile> photos;
}
