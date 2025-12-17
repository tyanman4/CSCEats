package com.example.backend.service;

import java.util.List;

import org.springframework.stereotype.Service;

import com.example.backend.entity.Restaurants;
import com.example.backend.exception.ResourceNotFoundException;
import com.example.backend.form.RestaurantsUpdateForm;
import com.example.backend.mapper.RestaurantsMapper;

import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class RestaurantsService {
    private final RestaurantsMapper restaurantsMapper;

    public List<Restaurants> selectAll() {
        return restaurantsMapper.selectAllRestaurants();
    }

    public Restaurants selectById(Long id) {
        return restaurantsMapper.selectById(id);
    }

    @Transactional
    public void update(
            Long id, RestaurantsUpdateForm form) {
        int updated = restaurantsMapper.update(id, form);
        if (updated == 0) {
            throw new ResourceNotFoundException("restaurants not found");
        }
    };
}
