package com.example.backend.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

@Controller
public class SpaForwardController {

    /**
     * ルート
     */
    @GetMapping("/")
    public String root() {
        return "forward:/index.html";
    }

    /**
     * 1階層パス（例: /restaurants）
     */
    @GetMapping("/{path:[^\\.]+}")
    public String singleLevel() {
        return "forward:/index.html";
    }

    /**
     * 2階層以上（例: /restaurants/1, /profile/settings）
     */
    @GetMapping("/{path1:[^\\.]+}/{path2:[^\\.]+}")
    public String multiLevel() {
        return "forward:/index.html";
    }
}
