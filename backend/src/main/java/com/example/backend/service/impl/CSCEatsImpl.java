package com.example.backend.service.impl;

import java.util.List;
import java.util.ArrayList;
import java.util.Map;
import java.util.Optional;
import java.util.HashMap;

import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.example.backend.entity.RestaurantReview;
import com.example.backend.entity.User;
import com.example.backend.entity.RequestRestaurant;
import com.example.backend.mapper.RestaurantReviewMapper;
import com.example.backend.mapper.UserMapper;
import com.example.backend.mapper.RequestRestaurantMapper;
import com.example.backend.security.JwtUtil;
import com.example.backend.service.CSCEatsService;

import lombok.RequiredArgsConstructor;

@Service
@Transactional
@RequiredArgsConstructor
public class CSCEatsImpl implements CSCEatsService {

    /** DI */
    private final UserMapper userMapper;
    private final JwtUtil jwtUtil;
    private final AuthenticationManager authManager;
    private final RestaurantReviewMapper restaurantReviewMapper;
    private final RequestRestaurantMapper requestRestaurantMapper;

    private Map<String, List<String>> parseSearchKeywords(String search) {
        List<String> categoryKeywords = new ArrayList<>();
        List<String> keywords = new ArrayList<>();

        if (search != null && !search.trim().isEmpty()) {
            String[] parts = search.trim().split("\s+"); // 空白で分割（AND条件）
            for (String word : parts) {
                if (word.startsWith("#")) {
                    categoryKeywords.add(word.substring(1)); // #を外してカテゴリ名
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

    @Override
    public List<RestaurantReview> findRestaurantsWithReviewSummary(String search, List<String> sorts, int page) {
        int limit = 20;
        int offset = ( page - 1) * limit;

        Map<String, List<String>> parsed = parseSearchKeywords(search);

        Map<String, Object> params = new HashMap<>();
        params.put("categories", parsed.get("categories"));
        params.put("keywords", parsed.get("keywords"));
        params.put("sorts", sorts);
        params.put("limit", limit);
        params.put("offset", offset);

        return restaurantReviewMapper.findRestaurantsWithReviewSummary(params);
    }

    @Override
    public int findTotalCountRestaurants(String search) {
        Map<String, List<String>> parsed = parseSearchKeywords(search);
        Map<String, Object> params = new HashMap<>(parsed);
        return restaurantReviewMapper.findTotalCountRestaurants(params);
    }

    @Override
    public User findByIdUser(Integer id) {
        return userMapper.selectById(id);
    }

    @Override
    public List<Map<String, Object>> findCategoriesByUsage() {
        return restaurantReviewMapper.findCategoriesByUsage();
    }

    @Override
    public boolean checkExistsByName(String name) {
        return userMapper.countByName(name) > 0;
    }

    @Override
    public void insertUser(User user) {
        userMapper.insert(user);
    }

    @Override
    public String login(String username, String password) {
        Authentication authentication = authManager
                .authenticate(new UsernamePasswordAuthenticationToken(username, password));
       
        UserDetails userDetails = (UserDetails) authentication.getPrincipal();

        // ← ここで User エンティティを取得
        User user = userMapper.findByName(userDetails.getUsername()).orElseThrow(() -> new RuntimeException("User not found"));

        return jwtUtil.generateToken(user);
    }

    // RequestRestaurant関連のメソッド
    @Override
    public List<RequestRestaurant> findAllForAdmin() {
        return requestRestaurantMapper.findAllForAdmin();
    }

    @Override
    public List<RequestRestaurant> findAllForUser(Long userId) {
        return requestRestaurantMapper.findAllForUser(userId);  
    }

    @Override
    public void insert(String name, String address, String url, Long userId) {
        RequestRestaurant requestRestaurant = new RequestRestaurant();
        requestRestaurant.setName(name);
        requestRestaurant.setAddress(address);
        requestRestaurant.setUrl(url);
        requestRestaurant.setUserId(userId);
        requestRestaurant.setStatus("pending");

        requestRestaurantMapper.insert(requestRestaurant);
    }

    @Override
    public void approve(Long id) {
        requestRestaurantMapper.approve(id);
    }

    @Override
    public void reject(Long id, String rejectReason) {
        requestRestaurantMapper.reject(id, rejectReason);
    }
}
