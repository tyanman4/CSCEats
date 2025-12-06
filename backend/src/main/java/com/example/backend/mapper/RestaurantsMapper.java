package com.example.backend.mapper;

import org.apache.ibatis.annotations.Mapper;

@Mapper
public interface RestaurantsMapper {

    void insertApprovedRestaurant(
            String name,
            String address,
            Integer distance,
            String url,
            Double latitude,
            Double longitude);
}
