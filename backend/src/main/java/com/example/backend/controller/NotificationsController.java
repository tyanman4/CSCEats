package com.example.backend.controller;

import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.backend.entity.Notifications;
import com.example.backend.service.NotificationsService;

import lombok.RequiredArgsConstructor;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/notifications")
public class NotificationsController {

    private final NotificationsService notificationsService;

    @GetMapping("/user/{userId}")
    public ResponseEntity<List<Notifications>> getByUserId(@PathVariable Long userId) {
        return ResponseEntity.ok(notificationsService.findByUserId(userId));
    }

    @PostMapping("to-read/{notificationsId}")
    public ResponseEntity<String> toRead(@PathVariable Long notificationsId) {
        notificationsService.toRead(notificationsId);
        return ResponseEntity.ok("既読に変更されました。");
    }
}
