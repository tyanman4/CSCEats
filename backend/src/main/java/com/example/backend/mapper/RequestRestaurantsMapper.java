package com.example.backend.mapper;

import org.apache.ibatis.annotations.Mapper;
import com.example.backend.entity.RequestRestaurants;
import java.util.List;

@Mapper
public interface RequestRestaurantsMapper {

    RequestRestaurants selectRequestRestaurantsById(Integer requestId);

    List<RequestRestaurants> selectPendingRequestRestaurants();

    void approveRequestRestaurant(Integer requestId, Integer adminId);

    void rejectRequestRestaurant(Integer requestId, Integer adminId, String reason);
}
