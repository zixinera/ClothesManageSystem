package com.xhu.nine.mapper;

import com.xhu.nine.dto.UpdatePasswordDto;
import org.apache.ibatis.annotations.Delete;
import org.apache.ibatis.annotations.Mapper;
import com.xhu.nine.dto.User;

import java.util.List;

@Mapper
public interface UserMapper {
    void insertUser(User user);
    User selectUserById(Integer userId);
    User selectUserByName(String userName);
    List<User> findUser();

    void updateUser(UpdatePasswordDto updatePasswordDto);

@Delete("delete from p_user where user_id=#{id}")
    void deleteUser(int id);
}
