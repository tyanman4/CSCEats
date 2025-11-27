package com.example.backend.service;

import com.example.backend.entity.Photo;

import java.util.List;

public interface PhotoService {

    void insert(Photo photo);

    void approvePhoto(Long photoId);

    void rejectPhoto(Long photoId, String reason);

    List<Photo> getPhotosByRestaurant(Long restaurantId);

    List<Photo> getPhotosByUser(Long userId);

    List<Photo> getPhotosByStatus(String status);
}
