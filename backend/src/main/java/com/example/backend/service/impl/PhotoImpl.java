package com.example.backend.service.impl;

import com.example.backend.entity.Photo;
import com.example.backend.mapper.PhotoMapper;
import com.example.backend.service.PhotoService;
import com.example.backend.service.FileStorageService;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

@Service
@RequiredArgsConstructor
public class PhotoImpl implements PhotoService {

    private final PhotoMapper photoMapper;
    private final FileStorageService fileStorageService;

    @Override
    public void savePhoto(Long restaurantId, Long userId, MultipartFile file) {
        String fileUrl = fileStorageService.store(file);
        
        Photo photo = new Photo();
        photo.setRestaurantId(restaurantId);
        photo.setUserId(userId);
        photo.setUrl(fileUrl);
        photo.setStatus("pending");

        photoMapper.insert(photo);
    }

    @Override
    public void savePhotos(Long restaurantId, Long userId, List<MultipartFile> file) {
        for (MultipartFile f : file) {
            savePhoto(restaurantId, userId, f);
        }
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
