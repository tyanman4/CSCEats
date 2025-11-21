package com.example.backend.service;

import java.util.List;
import java.util.Map;

import org.apache.ibatis.annotations.Param;

import com.example.backend.entity.RestaurantReview;
import com.example.backend.entity.User;
import com.example.backend.entity.RequestRestaurant;

public interface CSCEatsService {

    List<RestaurantReview> findRestaurantsWithReviewSummary(String search, List<String> sorts, int page);

    int findTotalCountRestaurants(String search);

    User findByIdUser(Integer user_id);

    boolean checkExistsByName(String name);

    void insertUser(User user);

    String login(String username, String password);

    List<Map<String, Object>> findCategoriesByUsage();

    // RecuestRestaurant関連のメソッド
    List<RequestRestaurant> findAllForAdmin();
    List<RequestRestaurant> findAllForUser(@Param("userId") Long userId);
    void insert(RequestRestaurant requestRestaurant);
    void approve(@Param("id") Long id);
    void reject(@Param("id") Long id, @Param("rejectReason") String rejectReason);
}