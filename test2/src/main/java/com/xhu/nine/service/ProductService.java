package com.xhu.nine.service;

import com.xhu.nine.dto.ProductQueryDto;
import com.xhu.nine.entity.Product;
import com.xhu.nine.result.AjaxResult;

public interface ProductService {
    AjaxResult queryProducts(ProductQueryDto productQueryDto);
    AjaxResult queryProductById(Integer productId);

//更新衣服信息
    void updateProduct(Product product);
}
