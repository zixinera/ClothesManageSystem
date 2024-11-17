package com.xhu.nine.entity;


import lombok.Data;

@Data
public class Product {
    private Integer productId;
    private String productName;
    private String productCategory;
    private String productPurchase;
    private String productSelling;
    private Integer productQuantity;
    private String entryTime;
    private String updateTime;
    private Boolean isReturn;
    private Integer userId;
    private String salesStatus;
}
