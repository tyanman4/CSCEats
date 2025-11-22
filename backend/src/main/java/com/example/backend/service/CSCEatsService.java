package com.example.backend.service;

import java.util.List;
import java.util.Map;
import java.util.Optional;

import com.example.backend.entity.RestaurantReview;
import com.example.backend.entity.User;

public interface CSCEatsService {

    List<RestaurantReview> findRestaurantsWithReviewSummary(String search, List<String> sorts, int page);

    int findTotalCountRestaurants(String search);

    User findByIdUser(Integer user_id);

    Optional<User> findByName(String name);

    boolean checkExistsByName(String name);

    void insertUser(User user);

    void updateName(String newName, String name);

    void updateIntroduction(String name, String introduction);

    void updatePassword(String name, String password);

    String login(String username, String password);

    List<Map<String, Object>> findCategoriesByUsage();
}