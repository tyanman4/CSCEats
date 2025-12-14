package com.example.backend.mapper;

import java.util.List;

import org.apache.ibatis.annotations.Mapper;

import com.example.backend.entity.Restaurants;
import com.example.backend.form.RestaurantsUpdateForm;

@Mapper
public interface RestaurantsMapper {

        int insertApprovedRestaurant(
                        String name,
                        String address,
                        Integer distance,
                        String url,
                        Double latitude,
                        Double longitude);

        int update(Long id, RestaurantsUpdateForm form);

        List<Restaurants> selectAllRestaurants();

        Restaurants selectById(Long id);
}
