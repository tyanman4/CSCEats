package com.example.backend.mapper;

import com.example.backend.entity.RestaurantReview;
import org.apache.ibatis.annotations.Mapper;

import java.util.List;
import java.util.Map;

@Mapper
public interface RestaurantReviewMapper {
    List<RestaurantReview> findRestaurantsWithReviewSummary(Map<String, Object> params);

    int findTotalCountRestaurants(Map<String, Object> params);
}