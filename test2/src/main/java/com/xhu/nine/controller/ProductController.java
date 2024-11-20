package com.xhu.nine.controller;

import com.xhu.nine.dto.ProductQueryDto;
import com.xhu.nine.entity.Product;
import com.xhu.nine.result.AjaxResult;
import com.xhu.nine.service.ProductService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class ProductController {
    @Autowired
    private ProductService productService;


    @PostMapping("/products")
    public AjaxResult findProducts(ProductQueryDto productQueryDto){
        return productService.queryProducts(productQueryDto);
    }

    //获取Users

    @PostMapping("/findProductById")
    public AjaxResult findProductById(Integer productId){
        return productService.queryProductById(productId);
    }
@PostMapping("/updateProduct")
public AjaxResult updateProduct(@RequestBody Product product){
    System.out.println(product);
    productService.updateProduct(product);
    return AjaxResult.ok().message("更新成功");
}

}
