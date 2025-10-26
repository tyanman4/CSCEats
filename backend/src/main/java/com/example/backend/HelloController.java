package com.example.backend;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.CrossOrigin;

@RestController
@CrossOrigin(origins = "http://localhost:3000")
public class HelloController {

    @GetMapping("/api/message")
    public String getMessage() {
        return "Hello from Spring!";
    }

    @GetMapping("/api/message2")
    public String getMessage2() {
        return "Hello from Summmmmmmmmmer!";
    }
}