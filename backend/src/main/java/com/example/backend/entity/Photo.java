package com.example.backend.entity;

import lombok.Data;
import java.time.LocalDateTime;

@Data
public class Photo {

    private Long photoId;               // PK

    private Long restaurantId;          // 正式レストランに紐づく場合
    private Long requestRestaurantId;   // レストラン追加依頼に紐づく場合（どちらか片方が使われる）

    private Long userId;                // 投稿ユーザー
    private String url;                 // 保存先URL or パス

    private Integer sortOrder;          // 並び順（初期0）

    private String status;              // pending / approved / rejected
    private String rejectReason;        // 却下理由（rejected のときのみ利用）

    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;
}
