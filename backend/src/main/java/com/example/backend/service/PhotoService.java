package com.example.backend.service;

import com.example.backend.entity.Photo;
import com.example.backend.mapper.PhotoMapper;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service; // ← import が漏れていた
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

@Service
@RequiredArgsConstructor
public class PhotoService {

    private final PhotoMapper photoMapper;

    public void savePhotoUrls(
            Long restaurantId,
            Long requestRestaurantId,
            Long userId,
            List<String> photoUrls) {
        for (String url : photoUrls) {
            Photo photo = new Photo();
            photo.setRestaurantId(restaurantId);
            photo.setRequestRestaurantId(requestRestaurantId);
            photo.setUserId(userId);
            photo.setUrl(url);
            photo.setStatus("pending");

            photoMapper.insert(photo);
        }
    }

    public List<Photo> getPhotosByRestaurant(Long restaurantId) {
        return photoMapper.findByRestaurantId(restaurantId);
    }

    public List<Photo> getPhotosByUser(Long userId) {
        return photoMapper.findByUserId(userId);
    }

    public List<Photo> getByStatus(String status) {
        return photoMapper.findByStatus(status);
    }

    public List<Photo> getApprovedByRestaurantId(Long restaurantId) {
        return photoMapper.findApprovedByRestaurantId(restaurantId);
    }
}
