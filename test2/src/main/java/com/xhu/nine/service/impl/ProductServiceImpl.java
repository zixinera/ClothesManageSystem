package com.xhu.nine.service.impl;

import com.xhu.nine.dto.ProductQueryDto;
import com.xhu.nine.entity.Product;
import com.xhu.nine.mapper.ProductMapper;
import com.xhu.nine.result.AjaxResult;
import com.xhu.nine.service.ProductService;
import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ProductServiceImpl implements ProductService {
    @Autowired
    private ProductMapper productMapper;

    @Override
    public AjaxResult queryProducts(ProductQueryDto productQueryDto) {
        Product product = new Product();
        BeanUtils.copyProperties(productQueryDto, product);
        List<Product> products = productMapper.selectProductAll(product);
        return AjaxResult.ok().data(products);
    }

    @Override
    public AjaxResult queryProductById(Integer productId) {
        Product product = productMapper.selectProductById(productId);
        return AjaxResult.ok().data(product);
    }

    @Override
    public void updateProduct(Product product) {
        productMapper.updateProduct(product);
    }

    @Override
    public void deleteProduct(Integer productId) {
        productMapper.deleteByProductId(productId);
    }
}
