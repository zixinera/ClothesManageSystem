package com.xhu.nine;

import org.mybatis.spring.annotation.MapperScan;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
@MapperScan("com.xhu.nine.mapper")
@MapperScan("com.xhu.nine.mapper.UserMapper")
public class ApparelStoreApplication {

    public static void main(String[] args) {
        SpringApplication.run(ApparelStoreApplication.class, args);
    }

}