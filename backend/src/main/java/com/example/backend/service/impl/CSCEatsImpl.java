package com.example.backend.service.impl;

import java.util.List;
import java.util.ArrayList;
import java.util.Map;
import java.util.Optional;
import java.util.HashMap;

import org.springframework.data.geo.GeoResult;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.example.backend.entity.RequestRestaurants;
import com.example.backend.entity.RestaurantReview;
import com.example.backend.entity.User;
import com.example.backend.helper.GeoUtils;
import com.example.backend.mapper.RestaurantReviewMapper;
import com.example.backend.mapper.RestaurantsMapper;
import com.example.backend.mapper.UserMapper;
import com.example.backend.mapper.RequestRestaurantsMapper;
import com.example.backend.security.JwtUtil;
import com.example.backend.service.CSCEatsService;
import com.example.backend.service.GeocodingService;

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
    private final RequestRestaurantsMapper requestRestaurantsMapper;
    private final GeocodingService geocodingService;
    private final GeoUtils geoUtils;
    private final RestaurantsMapper restaurantsMapper;

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
    public Optional<User> findByName(String name) {
        return userMapper.findByName(name);
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
    public void updateName(String newName, String name) {
        userMapper.updateName(newName, name);

    }

    @Override
    public void updateIntroduction(String name, String introduction) {
        userMapper.updateIntroduction(name, introduction);
    }

    @Override
    public void updatePassword(String name, String password) {
        userMapper.updatePassword(name, password);
    };

    @Override
    public String login(String username, String password) {
        Authentication authentication = authManager
                .authenticate(new UsernamePasswordAuthenticationToken(username, password));
        UserDetails user = (UserDetails) authentication.getPrincipal();
        return jwtUtil.generateToken(user);
    }

    @Override
    public List<RequestRestaurants> findPendingRequestRestaurants() {
        return requestRestaurantsMapper.selectPendingRequestRestaurants();
    }

    @Override
    public void approveRequestRestaurant(Integer requestId, Integer adminId) {

        final double CSC_OFFICE_LAT = 35.712117;
        final double CSC_OFFICE_LON = 139.704741;

        requestRestaurantsMapper.approveRequestRestaurant(requestId, adminId);
        RequestRestaurants requestRestaurants = requestRestaurantsMapper.selectRequestRestaurantsById(requestId);
        String restaurantName = requestRestaurants.getName();
        String address = requestRestaurants.getAddress();
        String url = requestRestaurants.getUrl();
        double[] latlon = geocodingService.getLatLon(address);
        Double lattitude = (latlon == null) ? CSC_OFFICE_LAT : latlon[0];
        Double longitude = (latlon == null) ? CSC_OFFICE_LON : latlon[1];
        Integer distance = (int) geoUtils.distance(lattitude, longitude, CSC_OFFICE_LAT, CSC_OFFICE_LON);
        restaurantsMapper.insertApprovedRestaurant(restaurantName, address, distance, url, lattitude, longitude);
    }

    @Override
    public void rejectRequestRestaurant(Integer requestId, Integer adminId, String reason) {

        requestRestaurantsMapper.rejectRequestRestaurant(requestId, adminId, reason);
    }
}
