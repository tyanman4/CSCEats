package com.example.backend.service;

import com.example.backend.entity.Photo;
import com.example.backend.mapper.PhotoMapper;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;      // ← import が漏れていた
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

@Service
@RequiredArgsConstructor
public class PhotoService {

    private final PhotoMapper photoMapper;
    private final FileStorageService fileStorageService; // 同じ package なので import 不要

    public void savePhotos(Long restaurantId, Long requestRestaurantId,Long userID, List<MultipartFile> files) {
        for (MultipartFile f : files) {
            savePhoto(restaurantId, requestRestaurantId,userID, f);
        }
    }

    public void savePhoto(Long restaurantId, Long requestRestaurantId, Long userId, MultipartFile file) {
        String fileUrl = fileStorageService.store(file);

        Photo photo = new Photo();
        photo.setRestaurantId(restaurantId);
        photo.setRequestRestaurantId(requestRestaurantId);
        photo.setUserId(userId);
        photo.setUrl(fileUrl);
        photo.setStatus("pending");

        photoMapper.insert(photo);
    }

    public void approvePhoto(Long photoId) {
        photoMapper.approvePhoto(photoId);
    }

    public void rejectPhoto(Long photoId, String reason) {
        photoMapper.rejectPhoto(photoId, reason);
    }

    public List<Photo> getPhotosByRestaurant(Long restaurantId) {
        return photoMapper.findByRestaurantId(restaurantId);
    }

    public List<Photo> getPhotosByUser(Long userId) {
        return photoMapper.findByUserId(userId);
    }

    public List<Photo> getPhotosByStatus(String status) {
        return photoMapper.findByStatus(status);
    }
}
