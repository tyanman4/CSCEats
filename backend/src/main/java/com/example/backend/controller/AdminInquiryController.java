package com.example.backend.controller;

import java.time.LocalDateTime;
import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.example.backend.dto.ApiResponseDto;
import com.example.backend.entity.Inquiry;
import com.example.backend.entity.Photo;
import com.example.backend.service.InquiryService;

import jakarta.persistence.criteria.CriteriaBuilder.In;
import jakarta.servlet.http.HttpServletRequest;
import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/api/admin/inquiries")
@RequiredArgsConstructor
public class AdminInquiryController {

    private final InquiryService inquiryService;

    // @GetMapping("/{status}")
    // public ResponseEntity<ApiResponseDto<List<Inquiry>>> getInquiriesByStatus(
    // @PathVariable String status,
    // HttpServletRequest request) {
    // List<Inquiry> inquiries = inquiryService.getInquiriesByStatus(status);

    // ApiResponseDto<List<Inquiry>> response = new ApiResponseDto<>(
    // HttpStatus.OK.value(),
    // "Inquiries fetched successfully",
    // request.getRequestURI(),
    // LocalDateTime.now().toString(),
    // inquiries);

    // return ResponseEntity.ok(response);
    // }
    @GetMapping("/{status}")
    public ResponseEntity<List<Inquiry>> getInquiriesByStatus(@PathVariable String status) {
        return ResponseEntity.ok(inquiryService.getInquiriesByStatus(status));
    }
}
