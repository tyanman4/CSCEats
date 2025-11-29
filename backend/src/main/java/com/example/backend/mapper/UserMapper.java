package com.example.backend.mapper;

import java.util.List;
import java.util.Optional;

import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;

import com.example.backend.entity.User;

@Mapper
public interface UserMapper {

    List<User> selectAll();

    User selectById(Integer userId);

    void insert(User user);

    Optional<User> findByName(String name);

    int countByName(String name);

    void updateIntroduction(String name, String introduction);

    void updatePassword(String name, String password);

    void updateName(String newName, String name);
}