package com.xhu.nine.service.impl;

import com.xhu.nine.dto.ProductQueryDto;
import com.xhu.nine.dto.User;
import com.xhu.nine.entity.Product;
import com.xhu.nine.mapper.UserMapper;
import com.xhu.nine.result.AjaxResult;
import com.xhu.nine.service.UserService;
import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
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


}
