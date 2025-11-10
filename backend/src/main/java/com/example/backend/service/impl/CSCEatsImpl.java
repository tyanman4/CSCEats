package com.example.backend.service.impl;

import java.util.List;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.example.backend.entity.RestaurantReview;
import com.example.backend.entity.User;
import com.example.backend.mapper.RestaurantReviewMapper;
import com.example.backend.mapper.UserMapper;
import com.example.backend.service.CSCEatsService;

import lombok.RequiredArgsConstructor;

@Service
@Transactional
@RequiredArgsConstructor
public class CSCEatsImpl implements CSCEatsService {

    /** DI */
    private final UserMapper userMapper;
    private final RestaurantReviewMapper restaurantReviewMapper;

    @Override
    public List<User> findAllUser() {
        return userMapper.selectAll();
    }

    @Override
    public User findByIdUser(Integer id) {
        return userMapper.selectById(id);
    }

    @Override
    public List<RestaurantReview> findRestaurantsWithReviewSummary(int limit, int offset) {
        return restaurantReviewMapper.findRestaurantsWithReviewSummary(limit, offset);
    }

    @Override
    public int findTotalCountRestaurants() {
        return restaurantReviewMapper.findTotalCountRestaurants();
    }
}
