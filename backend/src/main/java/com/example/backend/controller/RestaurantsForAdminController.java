package com.example.backend.controller;

import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.backend.entity.Restaurants;
import com.example.backend.form.RestaurantsUpdateForm;
import com.example.backend.service.RestaurantsService;

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;

@RestController
@RequiredArgsConstructor
@CrossOrigin(origins = "http://localhost:5173")
@RequestMapping("/api/admin")
public class RestaurantsForAdminController {

    private final RestaurantsService restaurantsService;

    @GetMapping("restaurants")
    public List<Restaurants> getList() {
        return restaurantsService.selectAll();
    }

    @GetMapping("restaurants/{id}")
    public Restaurants getById(@PathVariable Long id) {
        return restaurantsService.selectById(id);
    }

    @PostMapping("restaurants/update/{id}")
    public ResponseEntity<String> update(
            @RequestBody @Valid RestaurantsUpdateForm form,
            @PathVariable Long id) {

        restaurantsService.update(id, form);
        return ResponseEntity.ok("approved");
    }
}
