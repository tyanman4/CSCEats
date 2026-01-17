package com.example.backend.mapper;

import org.apache.ibatis.annotations.Mapper;
import com.example.backend.entity.RequestRestaurants;
import java.util.List;

@Mapper
public interface RequestRestaurantsMapper {

    int insert(RequestRestaurants requestRestaurant);

    RequestRestaurants selectRequestRestaurantsById(Long requestId);

    List<RequestRestaurants> selectPendingRequestRestaurants();

    void approveRequestRestaurant(Long requestId, Long adminId);

    void rejectRequestRestaurant(Long requestId, Long adminId, String reason);

    List<RequestRestaurants> findByUserId(Long userId);

    int updateApprovedRestaurantId(Long restaurantId, Long requestId);
}
