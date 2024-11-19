package com.xhu.nine.service;

import com.xhu.nine.dto.LoginDto;
import com.xhu.nine.dto.RegisterDto;

import com.xhu.nine.result.AjaxResult;



public interface UserService {
    AjaxResult login(LoginDto loginDto);
    AjaxResult register(RegisterDto registerDto);
}
