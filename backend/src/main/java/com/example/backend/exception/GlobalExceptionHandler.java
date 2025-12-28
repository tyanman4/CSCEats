package com.example.backend.exception;

import java.time.Instant;
import java.util.HashMap;
import java.util.Map;

import org.springframework.http.ResponseEntity;

import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

import com.example.backend.dto.ApiResponseDto;

import jakarta.servlet.http.HttpServletRequest;

@RestControllerAdvice
public class GlobalExceptionHandler {

    @ExceptionHandler(MethodArgumentNotValidException.class)
    public ResponseEntity<ApiResponseDto<Map<String, String>>> handleValidationException(
            MethodArgumentNotValidException ex,
            HttpServletRequest request) {

        Map<String, String> errors = new HashMap<>();
        ex.getBindingResult().getFieldErrors().forEach(e -> errors.put(e.getField(), e.getDefaultMessage()));

        ApiResponseDto<Map<String, String>> response = new ApiResponseDto<>();
        response.setStatus(400);
        response.setMessage("バリデーションエラーが起きました。");
        response.setData(errors);
        response.setTimestamp(Instant.now().toString());
        response.setPath(request.getRequestURI());

        return ResponseEntity.badRequest().body(response);

    }

}
