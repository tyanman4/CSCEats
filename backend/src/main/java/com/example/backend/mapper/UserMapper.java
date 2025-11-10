package com.example.backend.mapper;

import java.util.List;

import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;

import com.example.backend.entity.User;

@Mapper
public interface UserMapper {

    List<User> selectAll();

    User selectById(@Param("user_id") Integer user_id);

    void insert(User user);

}