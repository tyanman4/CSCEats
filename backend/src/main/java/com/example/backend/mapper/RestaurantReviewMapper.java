package com.example.backend.mapper;

import com.example.backend.entity.RestaurantReview;
import org.apache.ibatis.annotations.Mapper;

import java.util.List;

@Mapper
public interface RestaurantReviewMapper {
    List<RestaurantReview> findRestaurantsWithReviewSummary(int offset);
}