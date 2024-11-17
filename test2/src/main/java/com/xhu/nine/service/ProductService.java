package com.xhu.nine.service;

import com.xhu.nine.dto.ProductQueryDto;
import com.xhu.nine.result.AjaxResult;

public interface ProductService {
    AjaxResult queryProducts(ProductQueryDto productQueryDto);
}
