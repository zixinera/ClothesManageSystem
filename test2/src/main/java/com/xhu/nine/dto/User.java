package com.xhu.nine.dto;

import lombok.Data;

@Data
public class User {
    private Integer userId;
    private String userName;
    private String userRole;
    private String userPassword;
    private String inviteCode;
}
