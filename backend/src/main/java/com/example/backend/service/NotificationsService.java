package com.example.backend.service;

import java.util.List;

import org.springframework.stereotype.Service;

import com.example.backend.entity.Notifications;
import com.example.backend.mapper.NotificationsMapper;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class NotificationsService {

    private final NotificationsMapper notificationsMapper;

    public List<Notifications> findByUserId(Long userId) {
        return notificationsMapper.findByUserId(userId);
    }

    public int toRead(Long notificationsId) {
        return notificationsMapper.toRead(notificationsId);
    }

    public boolean isAllRead(Long userId) {
        return notificationsMapper.countUnread(userId) == 0;
    }
}
