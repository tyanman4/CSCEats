package com.example.backend.service;

import com.example.backend.entity.Inquiry;
import com.example.backend.mapper.InquiryMapper;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@RequiredArgsConstructor
public class InquiryService {

    private final InquiryMapper inquiryMapper;

    public void submitInquiry(Inquiry inquiry) {
        if (inquiry.getUserId() == null) {
            throw new IllegalArgumentException("userId is required");
        }
        if (inquiry.getMessage() == null || inquiry.getMessage().isBlank()) {
            throw new IllegalArgumentException("message is required");
        }

        inquiryMapper.insert(inquiry);
    }

    public List<Inquiry> getUserInquiriesByStatus(Long userId, String status) {
        if (userId == null) {
            throw new IllegalArgumentException("userId is required");
        }
        return inquiryMapper.findByUserIdAndStatus(userId, status);
    }

    public List<Inquiry> getInquiriesByStatus(String status) {
        return inquiryMapper.findByStatus(status);
    }

    @Transactional
    public void startHandlingInquiry(Long inquiryId, Long adminUserId) {
        if (inquiryId == null || adminUserId == null) {
            throw new IllegalArgumentException("inquiryId and adminUserId are required");
        }

        int updated = inquiryMapper.updateStatusToInProgress(inquiryId, adminUserId);
        if (updated == 0) {
            throw new IllegalStateException("問い合わせが存在しない、または更新できません");
        }
    }

    @Transactional
    public void answerAndCloseInquiry(Long inquiryId, String answer, Long adminUserId) {
        if (inquiryId == null || adminUserId == null) {
            throw new IllegalArgumentException("inquiryId and adminUserId are required");
        }
        if (answer == null || answer.isBlank()) {
            throw new IllegalArgumentException("answer is required");
        }

        int updated = inquiryMapper.updateAnswer(inquiryId, answer, adminUserId);
        if (updated == 0) {
            throw new IllegalStateException("問い合わせが存在しない、または更新できません");
        }
    }
}
