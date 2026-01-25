package com.example.backend.mapper;

import com.example.backend.entity.Photo;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;

import java.util.List;

@Mapper
public interface PhotoMapper {

    // 写真追加
    void insert(Photo photo);

    // レストラン別一覧
    List<Photo> findByRestaurantId(@Param("restaurantId") Long restaurantId);

    // ユーザー別一覧
    List<Photo> findByUserId(@Param("userId") Long userId);

    // ステータス別一覧（Admin）
    List<Photo> findByStatus(@Param("status") String status);

    // レストラン別承認写真一覧
    List<Photo> findApprovedByRestaurantId(@Param("restaurantId") Long restaurandtId);

    int updateRestaurantIdByRequestId(Long restaurantId, Long requestRestaurantId);

    int update(Photo photo);

    // 写真IDからレストランIDとリクエストレストランIDを取得(firebaseのパス移動用)
    Long findRestaurantIdByPhotoId(Long photoId);
}
