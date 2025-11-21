package com.example.backend.mapper;

import java.util.List;

import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;

import com.example.backend.entity.RequestRestaurant;

@Mapper
public interface RequestRestaurantMapper {
    List<RequestRestaurant> findAllForAdmin();
    List<RequestRestaurant> findAllForUser(@Param("userId") Long userId);
    void insert(RequestRestaurant requestRestaurant);
    void approve(@Param("id") Long id);
    void reject(@Param("id") Long id, @Param("rejectReason") String rejectReason);
}