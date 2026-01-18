package com.example.backend.mapper;

import java.util.List;

import org.apache.ibatis.annotations.Mapper;

import com.example.backend.entity.Notifications;

@Mapper
public interface NotificationsMapper {

    List<Notifications> findByUserId(Long userId);

    int toRead(Long notificationId);

    int insert(Long userId, String type, Long relatedId);

    int countUnread(Long userId);
}
