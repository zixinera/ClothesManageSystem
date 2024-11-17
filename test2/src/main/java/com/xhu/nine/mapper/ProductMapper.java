package com.xhu.nine.mapper;

import com.xhu.nine.entity.Product;

import java.util.List;

public interface ProductMapper {
    List<Product> selectProductAll(Product product);
    Product selectProductById(Integer productId);
    Product selectProductByProductName(String productName);
    void deleteByProductId(Integer productId);
    void updateProduct(Product product);
    void insertProduct(Product product);
}
