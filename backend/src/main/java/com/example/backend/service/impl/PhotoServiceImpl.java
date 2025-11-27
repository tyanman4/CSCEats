package com.example.backend.service.impl;

import com.example.backend.entity.Photo;
import com.example.backend.mapper.PhotoMapper;
import com.example.backend.service.PhotoService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class PhotoServiceImpl implements PhotoService {

    private final PhotoMapper photoMapper;

    @Override
    public void insert(Photo photo) {
        photoMapper.insert(photo);
    }

    @Override
    public void approvePhoto(Long photoId) {
        photoMapper.approvePhoto(photoId);
    }

    @Override
    public void rejectPhoto(Long photoId, String reason) {
        photoMapper.rejectPhoto(photoId, reason);
    }

    @Override
    public List<Photo> getPhotosByRestaurant(Long restaurantId) {
        return photoMapper.findByRestaurantId(restaurantId);
    }

    @Override
    public List<Photo> getPhotosByUser(Long userId) {
        return photoMapper.findByUserId(userId);
    }

    @Override
    public List<Photo> getPhotosByStatus(String status) {
        return photoMapper.findByStatus(status);
    }
}
