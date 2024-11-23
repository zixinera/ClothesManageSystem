package com.xhu.nine.dto;

import lombok.Data;

@Data
public class UpdatePasswordDto {
    private Integer userId;
    private String oldPassword;
    private String newPassword;
}
