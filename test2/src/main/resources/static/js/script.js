
$(document).ready(function (){
    queryProductsInfo();
      deleteusers();
    //做完queryProductsInfo()再把下面这个注释去掉

    // 在 index 页面加载时检查 sessionStorage 中是否有标志

    window.onload = function() {
        var sessionLogin = sessionStorage.getItem("sessionLogin");
        if (sessionLogin !== "true"){
            window.location.href = '/page/login.html';
        }
}
    //为index页面的增删改查功能做判断lh
    var userRole = localStorage.getItem("currentRole");
    console.log(userRole)// 获取用户角色
            if (userRole === "user") {
                $("#addButton,#deleteButton,#deleteUser").hide(); // 隐藏普通用户不允许操作的按钮
            }

    // 监听全选复选框的变化
    $("#selectAll").change(function() {
        var isChecked = $(this).is(":checked"); // 获取全选复选框的状态
        // 设置所有行的复选框状态
        $('#tab input[type="checkbox"]').prop("checked", isChecked);
    });



})
function showSearchDialog() {
    $('#searchDialog').show();
    $('#operateDialog').hide();
}

function showOperateDialog() {
    $('#operateDialog').show();
    $('#searchDialog').hide();
}

function queryProductsInfo(){
    showOperateDialog();

    var productid = $("#searchId").val();
    var productname = $("#searchName").val();
    var productcategory = $("#searchCategory").val();
    var productpurchase = $("#searchPurchase").val();
    var productselling = $("#searchSelling").val();
    var productquantity = $("#searchQuantity").val();
    var entrytime = $("#searchETime").val();
    var updatetime = $("#searchUTime").val();
    var judgment = $("#searchReturn").val();
    var userid = $("#searchUserId").val();
    var salesstatus = $("#searchStatus").val();
    var isreturn = null;
    if (judgment === "是"){
        isreturn = true;
    }else {
        isreturn = false;
    }
    var product ={
        "productId":productid,
        "productName":productname,
        "productCategory":productcategory,
        "productPurchase":productpurchase,
        "productSelling":productselling ,
        "productQuantity":productquantity,
        "entryTime":entrytime,
        "updateTime":updatetime,
        "isReturn":isreturn,
        "userId":userid,
        "salesStatus":salesstatus
    }
    $.ajax({
        url:"/products",
        type:"POST",
        data:product,
        dataType:"json",
        success:function (res){
            console.log(res.data);
            if (res.code === 200){
                var products = res.data;
                var str = "";
                for (var i = 0;i<products.length;i++){
                    var judgment = null;
                    if (products[i].isReturn){
                        judgment = "是";
                    }else {
                        judgment = "否";
                    }
                    str += "<tr><td>"+products[i].productId+"</td><td>"+products[i].productName+"</td>" +
                        "<td>"+products[i].productCategory+"</td><td>"+products[i].productPurchase+"</td><td>"+products[i].productSelling+"</td>" +
                        "<td>"+products[i].productQuantity+"</td><td>"+products[i].entryTime+"</td><td>"+products[i].updateTime+"</td>" +
                        "<td>"+judgment+"</td><td>"+products[i].userId+"</td><td>"+products[i].salesStatus+"</td>" +
                        "<td><button type=\"button\" class='updateBtn' onclick='openUpdateDialog("+JSON.stringify(products[i])+")'>修改</button>" +
                        "<button type=\"button\" class='deleteBtn' onclick='deleteProducts("+products[i].productId+")'>删除</button></td></tr>"
                }
                $("#tab").html(str);
                // 根据角色隐藏按钮lh
            var userRole = localStorage.getItem("currentRole"); // 获取用户角色
                console.log(userRole);
            if (userRole === "user") {
                $(".updateBtn, .deleteBtn").hide(); // 隐藏普通用户不允许操作的按钮
            }
            }
        },
        error:function (){
            alert("服务器出错！");
        }
    })
}


//跳转删除用户信息界面
function deleteUsers(){
    window.location.href = '/page/deleteuser.html';
}
//删除用户信息

function deleteusers(id){
var userId=id;
    // 发送PUT请求

    // 发送PUT请求
    $.ajax({
        url: '/deleteUser',
        type: 'POST',
        contentType: 'application/json', // 指定内容类型为 JSON
        data: JSON.stringify(userId),
        dataType:"json",
        success: function(data) {
            // 处理成功响应
            console.log('删除成功:', data);
            alert('用户删除成功！');

             $.ajax({
                 url:"/users",
                 type:"POST",
                 success:function (res){
                     console.log(res.data);
                     if (res.code === 200){
                         var users = res.data;
                         console.log(users);
                         var str = "";
                         for (var i = 0;i<users.length;i++){
                             str += "<tr><td>"+users[i].userId+"</td><td>"+users[i].userName+"</td>" +
                                 "<td><button type=\"button\" onclick='deleteusers("+users[i].userId+")'>删除</button></td></tr>"
                         }
                         $("#tab1").html(str);
                     }
                 },
                 error:function (){
                     alert("服务器出错！");
                 }
             })

        },
        error: function(jqXHR, textStatus, errorThrown) {
            // 处理错误
            // console.error('更新失败:', textStatus, errorThrown);
            // alert('更新失败，请稍后重试。');
        }
    });

    $.ajax({
        url:"/users",
        type:"POST",
        success:function (res){
            console.log(res.data);
            if (res.code === 200){
                var users = res.data;
                console.log(users);
                var str = "";
                for (var i = 0;i<users.length;i++){
                    str += "<tr><td>"+users[i].userId+"</td><td>"+users[i].userName+"</td>" +
                        "<td><button type=\"button\" onclick='deleteusers("+users[i].userId+")'>删除</button></td></tr>"
                }
                $("#tab1").html(str);
            }
        },
        error:function (){
            // alert("服务器出错！");
        }
    })


}
function addProduct(){

}
function updateProduct(){
    var productid = $("#updateId").val();
    var productname = $("#updateName").val();
    var productcategory = $("#updateCategory").val();
    var productpurchase = $("#updatePurchase").val();
    var productselling = $("#updateSelling").val();
    var productquantity = $("#updateQuantity").val();
    var judgment = $("#updateReturn").val();
    var userid = $("#updateUserId").val();
    var salesstatus = $("#updateStatus").val();
    var isreturn = null;
    if (judgment === "是"){
        isreturn = true;
    }else {
        isreturn = false;
    }

    var product = {
        "productId":productid,
        "productName":productname,
        "productCategory":productcategory,
        "productPurchase":productpurchase,
        "productSelling":productselling ,
        "productQuantity":productquantity,
        "isReturn":isreturn,
        "userId":userid,
        "salesStatus":salesstatus
    };
    // 发送PUT请求
    $.ajax({
        url: '/updateProduct',
        type: 'POST',
        contentType: 'application/json', // 指定内容类型为 JSON
        data: JSON.stringify(product),
        dataType:"json",
        success: function(data) {
            // 处理成功响应
            console.log('更新成功:', data);
            alert('产品更新成功！');
            // 在这里可以更新前端界面，例如刷新产品列表或更新某些字段
            queryProductsInfo();
            $("#updateDialog").hide();
        },
        error: function(jqXHR, textStatus, errorThrown) {
            // 处理错误
            console.error('更新失败:', textStatus, errorThrown);
            alert('更新失败，请稍后重试。');
        }
    });

}


function deleteProducts(id){
    var isDelete= confirm("请确认是否删除这些记录？");
    var productid=id;
    console.log(productid);
    if (isDelete){
        $.ajax({
            url: '/deleteProduct',
            type: 'POST',
            contentType: 'application/json', // 指定内容类型为 JSON
            data: JSON.stringify(productid),
            dataType:"json",
            success: function(data) {
                // 处理成功响应
                console.log('删除成功:', data);
                alert('产品删除成功！');
                queryProductsInfo();
            },
            error: function(jqXHR, textStatus, errorThrown) {
                // 处理错误
                // console.error('更新失败:', textStatus, errorThrown);
                // alert('更新失败，请稍后重试。');
            }
        });





    }
}


function resetAll(){
    $("#searchId").val("");
    $("#searchName").val("");
    $("#searchCategory").val("");
    $("#searchPurchase").val("");
    $("#searchSelling").val("");
    $("#searchQuantity").val("");
    $("#searchETime").val("");
    $("#searchUTime").val("");
    $("#searchReturn").val("");
    $("#searchUserId").val("");
    $("#searchStatus").val("");
}

function openAddDialog(){
    $("#addDialog").show();
}

function closeAddDialog(){
    $("#addDialog").hide();
}

function openUpdateDialog(product){
    $("#updateDialog").show();
    var judgment = null;
    if (product.isReturn){
        judgment = "是";
    }else {
        judgment = "否";
    }
    $("#updateId").val(product.productId);
    $("#updateName").val(product.productName);
    $("#updateCategory").val(product.productCategory);
    $("#updatePurchase").val(product.productPurchase);
    $("#updateSelling").val(product.productSelling);
    $("#updateQuantity").val(product.productQuantity);
    $("#updateETime").val(product.entryTime);
    $("#updateUTime").val(product.updateTime);
    $("#updateReturn").val(judgment);
    $("#updateUserId").val(product.userId);
    $("#updateStatus").val(product.salesStatus);
}

function closeUpdateDialog(){
    $("#updateDialog").hide();
}



