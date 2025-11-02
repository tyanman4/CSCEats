package com.example.backend.entity;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class User {
    private int user_id;
    private String name;
    private String password;
    private String introduction;
    private String created_at;
    private String updated_at;
}