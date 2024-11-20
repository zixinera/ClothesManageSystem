package com.xhu.nine.service;

import com.xhu.nine.dto.User;
import com.xhu.nine.result.AjaxResult;

public interface UserService {


    //查询用户
    AjaxResult findUser();

    void deleteUser(int id);
}
