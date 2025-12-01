package com.example.backend.service.impl;

import com.example.backend.entity.Photo;
import com.example.backend.mapper.PhotoMapper;
import com.example.backend.service.PhotoService;
import com.example.backend.service.FileStorageService;

import lombok.RequiredArgsConstructor;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

@Service
@RequiredArgsConstructor
public interface PhotoService {

    void savePhotos(Long restaurantId, Long userID, List<MultipartFile> file) {
        for (MultipartFile f : file) {
            savePhoto(restaurantId, userID, f);
        }
    };

    void savePhoto(Long restaurantId, Long userId, MultipartFile file) {
        String fileUrl = fileStorageService.store(file);
        
        Photo photo = new Photo();
        photo.setRestaurantId(restaurantId);
        photo.setUserId(userId);
        photo.setUrl(fileUrl);
        photo.setStatus("pending");

        photoMapper.insert(photo);
    };

    void approvePhoto(Long photoId) {
        photoMapper.approvePhoto(photoId);
    };

    void rejectPhoto(Long photoId, String reason) {
        photoMapper.rejectPhoto(photoId, reason);
    };

    List<Photo> getPhotosByRestaurant(Long restaurantId) {
        return photoMapper.findByRestaurantId(restaurantId);
    };

    List<Photo> getPhotosByUser(Long userId) {
        return photoMapper.findByUserId(userId);
    };

    List<Photo> getPhotosByStatus(String status) {
        return photoMapper.findByStatus(status);
    };
}
