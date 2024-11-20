package com.xhu.nine.service;

import com.xhu.nine.dto.User;
import com.xhu.nine.result.AjaxResult;

public interface UserService {


    //查询用户
    AjaxResult findUser();

    void deleteUser(int id);
import com.xhu.nine.dto.LoginDto;
import com.xhu.nine.dto.RegisterDto;

import com.xhu.nine.result.AjaxResult;



public interface UserService {
    AjaxResult login(LoginDto loginDto);
    AjaxResult register(RegisterDto registerDto);
}
