package com.example.backend.form;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;

import java.util.List;

import org.springframework.web.multipart.MultipartFile;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class RequestRestaurantForm {

    @NotBlank(message = "必須")
    private String name;

    @NotBlank(message = "必須")
    private String address;

    private String url;

    private List<MultipartFile> images;
}
