package com.xhu.nine.controller;

import com.xhu.nine.dto.ProductQueryDto;
import com.xhu.nine.result.AjaxResult;
import com.xhu.nine.service.ProductService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class ProductController {
    @Autowired
    private ProductService productService;

    @PostMapping("/products")
    public AjaxResult findProducts(ProductQueryDto productQueryDto){
        return productService.queryProducts(productQueryDto);
    }

    @PostMapping("/updateProduct")
    public AjaxResult findProductById(Integer productId){
        return productService.queryProductById(productId);
    }
}
