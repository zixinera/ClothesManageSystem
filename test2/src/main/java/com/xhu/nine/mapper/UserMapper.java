package com.xhu.nine.mapper;

import com.xhu.nine.entity.User;

public interface UserMapper {
    void deleteByUserId(Integer userId);
    void insertUser(User user);
    User selectUserById(Integer userId);
    User selectUserByName(String userName);
}
