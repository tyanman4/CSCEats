package com.example.backend.service;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.example.backend.entity.RestaurantReview;
import com.example.backend.mapper.RestaurantReviewMapper;

import java.util.*;

@Service
@Transactional
@RequiredArgsConstructor
public class RestaurantListService {

    private final RestaurantReviewMapper restaurantReviewMapper;

    private Map<String, List<String>> parseSearchKeywords(String search) {
        List<String> categoryKeywords = new ArrayList<>();
        List<String> keywords = new ArrayList<>();

        if (search != null && !search.trim().isEmpty()) {
            String[] parts = search.trim().split("\\s+");
            for (String word : parts) {
                if (word.startsWith("#")) {
                    categoryKeywords.add(word.substring(1));
                } else {
                    keywords.add(word);
                }
            }
        }

        Map<String, List<String>> result = new HashMap<>();
        result.put("categories", categoryKeywords);
        result.put("keywords", keywords);
        return result;
    }

    public List<RestaurantReview> findRestaurantsWithReviewSummary(String search, List<String> sorts, int page) {
        int limit = 20;
        int offset = (page - 1) * limit;

        Map<String, List<String>> parsed = parseSearchKeywords(search);

        Map<String, Object> params = new HashMap<>();
        params.put("categories", parsed.get("categories"));
        params.put("keywords", parsed.get("keywords"));
        params.put("sorts", sorts);
        params.put("limit", limit);
        params.put("offset", offset);

        return restaurantReviewMapper.findRestaurantsWithReviewSummary(params);
    }

    public int findTotalCountRestaurants(String search) {
        Map<String, List<String>> parsed = parseSearchKeywords(search);
        Map<String, Object> params = new HashMap<>(parsed);
        return restaurantReviewMapper.findTotalCountRestaurants(params);
    }

    public List<Map<String, Object>> findCategoriesByUsage() {
        return restaurantReviewMapper.findCategoriesByUsage();
    }
}
