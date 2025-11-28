package com.example.backend.mapper;

import com.example.backend.entity.Review;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;

import java.util.List;

@Mapper
public interface ReviewMapper {

    void insert(Review review);

    List<Review> findByRestaurantId(@Param("restaurantId") Long restaurantId);

}
