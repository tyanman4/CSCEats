package com.example.backend.mapper;

import com.example.backend.entity.Restaurant;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;

@Mapper
public interface RestaurantMapper {

    Restaurant findById(@Param("restaurantId") Long restaurantId);
}
