package com.example.backend.mapper;

import com.example.backend.entity.Inquiry;

import java.util.List;

import org.apache.ibatis.annotations.Mapper;

@Mapper
public interface InquiryMapper {
    void insert(Inquiry inquiry);

    List<Inquiry> findByUserIdAndStatus(Long userId, String status);

    List<Inquiry> findByStatus(String status);

    int updateAnswer(Long inquiryId, String answer, Long adminUserId);

    int updateStatusToInProgress(Long inquiryId, Long adminUserId);
}