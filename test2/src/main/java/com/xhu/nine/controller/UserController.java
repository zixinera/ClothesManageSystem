package com.xhu.nine.controller;

import com.xhu.nine.dto.*;
import com.xhu.nine.result.AjaxResult;
import com.xhu.nine.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.servlet.http.HttpServletResponse;

@RestController
@RequestMapping
public class UserController {
    @Autowired
    private UserService userService;

    @PostMapping("/users")
    public AjaxResult findUser(){
        AjaxResult user1=userService.findUser();
        return user1;

    }
    //删除用户
    @PostMapping("/deleteUser")
    public AjaxResult deleteUser(@RequestBody int id){
        userService.deleteUser(id);
        return AjaxResult.ok();
    }
    @PostMapping ("/login")
    public AjaxResult login(@RequestBody LoginDto loginDto)
    {
        return userService.login(loginDto);
    }
    @PostMapping("/register")
    public AjaxResult register(@RequestBody RegisterDto registerDto)
    {
        return userService.register(registerDto);
    }

    @PostMapping("/updatePassword")
    public AjaxResult updatePassword(@RequestBody UpdatePasswordDto updatePasswordDto)
    {
        return userService.updatePassword(updatePasswordDto);
    }
}
