package com.example.backend;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class HelloController {

    @GetMapping("/api/message")
    public String getMessage() {
        return "Hello from Spring!";
    }

    @GetMapping("/api/message2")
    public String getMessage2() {
        return "Hello from Summer!";
    }
}