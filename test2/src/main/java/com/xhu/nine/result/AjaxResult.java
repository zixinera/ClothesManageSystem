package com.xhu.nine.result;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class AjaxResult {
    private Integer code;//自定义响应的状态码(常见的：200,500,404,405,400)
    private String message;//自定义的消息描述内容
    private Object data;//是真实需要向前端返回的数据

    //代表的是请求响应成功后的调用函数
    public static AjaxResult ok() {
        AjaxResult ajaxResult = new AjaxResult(200, "操作成功！", null);
        return ajaxResult;
    }

    //代表的是请求响应失败后的调用函数
    public static AjaxResult error() {
        AjaxResult ajaxResult = new AjaxResult(500, "操作失败！", null);
        return ajaxResult;
    }

    //为了使用链式编程，返回的是当前对象(this)
    public AjaxResult code(Integer code) {
        this.code = code;
        return this;
    }

    public AjaxResult message(String message){
        this.message=message;
        return this;
    }

    public AjaxResult data(Object data){
        this.data=data;
        return this;
    }
}
