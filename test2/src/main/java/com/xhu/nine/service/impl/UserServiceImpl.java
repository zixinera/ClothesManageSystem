package com.xhu.nine.service.impl;

import com.xhu.nine.dto.ProductQueryDto;
import com.xhu.nine.dto.User;
import com.xhu.nine.entity.Product;
import com.xhu.nine.Util.Md5Util;

import com.xhu.nine.dto.LoginDto;
import com.xhu.nine.dto.RegisterDto;
import com.xhu.nine.entity.User;
import com.xhu.nine.mapper.UserMapper;
import com.xhu.nine.result.AjaxResult;
import com.xhu.nine.service.UserService;
import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
import org.springframework.web.bind.annotation.RequestBody;


@Service// 将当前类交给spring管理
public class UserServiceImpl implements UserService {
    @Autowired
    private UserMapper userMapper;
    @Override
    public AjaxResult findUser() {
        List<User> users=userMapper.findUser();
        System.out.println(users);
        return AjaxResult.ok().data(users);

    }

    @Override
    public void deleteUser(int id) {
        userMapper.deleteUser(id);
    }


public AjaxResult login(@RequestBody LoginDto loginDto) {
    // 从 DTO 获取用户名和密码
    String userName = loginDto.getUsername();
    String password = loginDto.getPassword();

    // 查询用户
    User u = userMapper.selectUserByName(userName);
    if (u == null) {
        return AjaxResult.error().message("用户名错误!");
    }

    // 密码加密
    String encryptedPassword = Md5Util.getMD5String(password);

    // 检查密码是否匹配
    if (encryptedPassword.equals(u.getUserPassword())) {
        return AjaxResult.ok().message("登录成功！");
    } else {
        return AjaxResult.error().message("密码错误！");
    }
}



    String inviteCode = "5201314";
    @Override
    public AjaxResult register(@RequestBody RegisterDto registerDto) {
        // 检查用户名是否已存在
        if (userMapper.selectUserByName(registerDto.getUserName()) != null) {
            return AjaxResult.error().message("用户名已存在!");
        }

        // 创建用户对象并复制属性
        User user = new User();
        BeanUtils.copyProperties(registerDto, user);

        // 设置角色
        if (user.getInviteCode() != null && !user.getInviteCode().isEmpty() && user.getInviteCode().equals(inviteCode)) {
            user.setUserRole("admin");
        } else {
            user.setUserRole("user");
        }

        // 加密密码并存储
       user.setUserPassword(Md5Util.getMD5String(user.getUserPassword()));

        // 插入用户数据
        userMapper.insertUser(user);

        return AjaxResult.ok().message("注册成功!");
    }
}
