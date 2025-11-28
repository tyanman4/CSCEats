package com.example.backend.mapper;

import org.apache.ibatis.annotations.Mapper;
import com.example.backend.entity.RequestRestaurants;
import java.util.List;

@Mapper
public interface RequestRestaurantsMapper {

    List<RequestRestaurants> selectPendingRequestRestaurants();

    void approveRequestRestaurant(Integer id);
}
