package com.xhu.nine.service;

import com.xhu.nine.dto.LoginDto;
import com.xhu.nine.dto.RegisterDto;
import com.xhu.nine.dto.User;
import com.xhu.nine.result.AjaxResult;

public interface UserService {


    //查询用户
    AjaxResult findUser();
//删除用户
    void deleteUser(int id);

    AjaxResult login(LoginDto loginDto);
    AjaxResult register(RegisterDto registerDto);
}
