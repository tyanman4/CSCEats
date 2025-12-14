package com.example.backend.mapper;

import com.example.backend.entity.Category;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;

import java.util.List;

@Mapper
public interface CategoryMapper {

    void insert(Category category);

    List<Category> findByRestaurantId(@Param("restaurantId") Long restaurantId);

    Long findIdByName(@Param("categoryName") String categoryName);

}
