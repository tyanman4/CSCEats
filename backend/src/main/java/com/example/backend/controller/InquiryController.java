package com.example.backend.controller;

import com.example.backend.dto.ApiResponseDto;
import com.example.backend.entity.Inquiry;
import com.example.backend.service.InquiryService;
import jakarta.servlet.http.HttpServletRequest;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.util.List;

@RestController
@RequestMapping("/api/inquiries")
@RequiredArgsConstructor
public class InquiryController {

    private final InquiryService inquiryService;

    @PostMapping
    public ResponseEntity<ApiResponseDto<Void>> submitInquiry(
            @RequestBody Inquiry inquiry,
            HttpServletRequest request) {
        inquiryService.submitInquiry(inquiry);

        ApiResponseDto<Void> response = new ApiResponseDto<>(
                HttpStatus.CREATED.value(),
                "Inquiry submitted successfully",
                request.getRequestURI(),
                LocalDateTime.now().toString(),
                null);

        return ResponseEntity.status(HttpStatus.CREATED).body(response);
    }

    @GetMapping("/me")
    public ResponseEntity<ApiResponseDto<List<Inquiry>>> getMyInquiries(
            @RequestParam Long userId,
            @RequestParam String status,
            HttpServletRequest request) {
        List<Inquiry> inquiries = inquiryService.getUserInquiriesByStatus(userId, status);

        ApiResponseDto<List<Inquiry>> response = new ApiResponseDto<>(
                HttpStatus.OK.value(),
                "My inquiries fetched successfully",
                request.getRequestURI(),
                LocalDateTime.now().toString(),
                inquiries);

        return ResponseEntity.ok(response);
    }

    @GetMapping
    public ResponseEntity<ApiResponseDto<List<Inquiry>>> getInquiriesByStatus(
            @RequestParam String status,
            HttpServletRequest request) {
        List<Inquiry> inquiries = inquiryService.getInquiriesByStatus(status);

        ApiResponseDto<List<Inquiry>> response = new ApiResponseDto<>(
                HttpStatus.OK.value(),
                "Inquiries fetched successfully",
                request.getRequestURI(),
                LocalDateTime.now().toString(),
                inquiries);

        return ResponseEntity.ok(response);
    }

    @PatchMapping("/{inquiryId}/start")
    public ResponseEntity<ApiResponseDto<Void>> startHandling(
            @PathVariable Long inquiryId,
            @RequestParam Long adminUserId,
            HttpServletRequest request) {
        inquiryService.startHandlingInquiry(inquiryId, adminUserId);

        ApiResponseDto<Void> response = new ApiResponseDto<>(
                HttpStatus.NO_CONTENT.value(),
                "Inquiry handling started",
                request.getRequestURI(),
                LocalDateTime.now().toString(),
                null);

        return ResponseEntity.status(HttpStatus.NO_CONTENT).body(response);
    }

    @PatchMapping("/{inquiryId}/answer")
    public ResponseEntity<ApiResponseDto<Void>> answerInquiry(
            @PathVariable Long inquiryId,
            @RequestParam Long adminUserId,
            @RequestBody String answer,
            HttpServletRequest request) {
        inquiryService.answerAndCloseInquiry(inquiryId, answer, adminUserId);

        ApiResponseDto<Void> response = new ApiResponseDto<>(
                HttpStatus.NO_CONTENT.value(),
                "Inquiry answered and closed",
                request.getRequestURI(),
                LocalDateTime.now().toString(),
                null);

        return ResponseEntity.status(HttpStatus.NO_CONTENT).body(response);
    }
}
