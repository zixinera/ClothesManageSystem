package com.xhu.nine.mapper;

import com.xhu.nine.entity.Product;
import org.apache.ibatis.annotations.Update;

import java.util.List;

public interface ProductMapper {
    List<Product> selectProductAll(Product product);
    Product selectProductById(Integer productId);
    void deleteByProductId(Integer productId);
@Update("update product_info set product_name=#{productName},product_category=#{productCategory}," +
        "product_purchase = #{productPurchase}, product_selling = #{productSelling},is_return = #{isReturn}," +
        " user_id = #{userId},sales_status = #{salesStatus},update_time = now(),product_quantity=#{productQuantity} where  product_id = #{productId} ")
    void updateProduct(Product product);
    void insertProduct(Product product);
}
