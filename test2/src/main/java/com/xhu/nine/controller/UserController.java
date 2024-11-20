package com.xhu.nine.controller;

import com.xhu.nine.dto.ProductQueryDto;
import com.xhu.nine.dto.User;
import com.xhu.nine.dto.LoginDto;
import com.xhu.nine.dto.RegisterDto;
import com.xhu.nine.result.AjaxResult;
import com.xhu.nine.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

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

@RestController
public class UserController {
    @Autowired
    private UserService userService;
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
}
