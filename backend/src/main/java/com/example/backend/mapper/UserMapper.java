package com.example.backend.mapper;

import java.util.List;
import java.util.Optional;

import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;

import com.example.backend.entity.User;

@Mapper
public interface UserMapper {

    List<User> selectAll();

    User selectById(@Param("user_id") Integer user_id);

    void insert(User user);

    // 複数件ヒットしても最初の一件だけ返す。見つからなかったらOptional.empty()が返る。
    Optional<User> findByName(String name);

    int countByName(String name);

    void updateIntroduction(String name, String introduction);
}