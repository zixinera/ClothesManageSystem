$(document).ready(function () {
    queryProductsInfo();
    deleteusers();
    //做完queryProductsInfo()再把下面这个注释去掉

    // 在 index 页面加载时检查 sessionStorage 中是否有标志

    window.onload = function () {
        var sessionLogin = sessionStorage.getItem("sessionLogin");
        if (sessionLogin !== "true") {
            window.location.href = '/page/login.html';
        }
    }
    //为index页面的增删改查功能做判断lh
    var currentRole = localStorage.getItem("currentRole");
    console.log(currentRole);
    // 获取用户角色
    if (currentRole === "user") {
        $("#addButton,#deleteButton,#deleteUser").hide(); // 隐藏普通用户不允许操作的按钮
    }


})

// 查询所有商品信息
function queryProductsInfo(currentPage = 10, pageSize = 1) {
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
    if (judgment === "是") {
        isreturn = true;
    } else {
        isreturn = false;
    }
    var product = {
        "productId": productid,
        "productName": productname,
        "productCategory": productcategory,
        "productPurchase": productpurchase,
        "productSelling": productselling,
        "productQuantity": productquantity,
        "entryTime": entrytime,
        "updateTime": updatetime,
        "isReturn": isreturn,
        "userId": userid,
        "salesStatus": salesstatus
    }
    $.ajax({
        url: "/products",
        type: "POST",
        contentType: 'application/json',
        data: JSON.stringify(product),
        dataType: "json",
        success: function (res) {
            if (res.code === 200) {
                var products = res.data;
                var str = "";
                var number = (pageSize - 1) * 10;
                var pNum = products.length;
                console.log(pNum);
                var Num = 0;
                if (pNum % 10 === 0) {
                    Num = parseInt(pNum / 10);
                } else {
                    Num = parseInt(pNum / 10) + 1;
                }
                if (pageSize === Num) {
                    currentPage = pNum % 10;
                }
                for (var m = 0; m < currentPage; m++) {
                    var judgment = null;
                    if (products[number].isReturn) {
                        judgment = "是";
                    } else {
                        judgment = "否";
                    }
                    str += "<tr><td>" + products[number].productId + "</td><td>" + products[number].productName + "</td>" +
                        "<td>" + products[number].productCategory + "</td><td>" + products[number].productPurchase + "</td>" +
                        "<td>" + products[number].productSelling + "</td><td>" + products[number].productQuantity + "</td>" +
                        "<td>" + products[number].entryTime + "</td><td>" + products[number].updateTime + "</td>" +
                        "<td>" + judgment + "</td><td>" + products[m].userId + "</td><td>" + products[number].salesStatus + "</td>" +
                        "<td><button type=\"button\" class='updateBtn' onclick='openUpdateDialog(" + JSON.stringify(products[number]) + ")'>修改</button>" +
                        "<button type=\"button\" class='deleteBtn' onclick='deleteProducts(" + products[number].productId + ")'>删除</button></td></tr>"
                    number++;
                }

                $("#tab").html(str);

                var userRole = localStorage.getItem("currentRole");
                if (userRole === "user") {
                    $(".updateBtn, .deleteBtn").hide();
                }
                var strPage = "";
                if (Num <= 5) {
                    for (var i = 0; i < Num; i++) {
                        var num1 = i + 1;
                        strPage += "<td><button id='" + num1 + "' type=\"button\" onclick='switchPages(" + num1 + ")' value='" + Num + "'>" + num1 + "</button></td>"
                    }
                } else {
                    if (pageSize > 3 && pageSize < Num - 2) {
                        for (var j = pageSize - 3; j < pageSize + 2; j++) {
                            var num2 = j + 1;
                            strPage += "<td><button id='" + num2 + "' type=\"button\" onclick='switchPages(" + num2 + ")' value='" + Num + "'>" + num2 + "</button></td>"
                        }
                    } else if (pageSize <= 3) {
                        for (var j = 0; j < 5; j++) {
                            var num2 = j + 1;
                            strPage += "<td><button id='" + num2 + "' type=\"button\" onclick='switchPages(" + num2 + ")'  value='" + Num + "'>" + num2 + "</button></td>"
                        }
                    } else {
                        for (var j = Num - 5; j < Num; j++) {
                            var num2 = j + 1;
                            strPage += "<td><button id='" + num2 + "' type=\"button\" onclick='switchPages(" + num2 + ")' value='" + Num + "'>" + num2 + "</button></td>"
                        }
                    }
                }
                $("#page").html(strPage);
            }
        }
        ,
        error: function (e) {
            alert("服务器出错！");
        }
    })
}

function updateByIdDialog(){
    var productId = $("#updateById").val();
    $.ajax({
        url: "/findProductById",
        type: "POST",
        contentType: 'application/json',
        data: JSON.stringify(productId),
        dataType: "json",
        success: function (res) {
            if (res.code === 200) {
                openUpdateDialog(res.data);
            }
        },
        error: function () {
            alert("服务器出错！");
        }
    })
}
//翻页
function switchPages(num) {
    queryProductsInfo(10, num);
    var str = "#" + num;
    var Num = parseInt($(str).val());
    $("#totalPage").val(Num);
    $("#previous").val(num);
    $("#next").val(num);
    $("#previous").prop("disabled", false);
    $("#next").prop("disabled", false);
}

//上一页
function previousPage() {
    var num = parseInt($("#previous").val());
    console.log(num);
    if (num === 1) {
        $("#previous").prop("disabled", true);
    } else {
        switchPages(num - 1);
    }
}

//下一页
function nextPage() {
    var num = parseInt($("#next").val());
    var Num = parseInt($("#totalPage").val());
    if (num === Num) {
        $("#next").prop("disabled", true);
    } else {
        switchPages(num + 1);
    }
}

//跳转删除用户信息界面
function openDeleteUsersDialog() {
    $("#userInformationDialog").hide();
    $("#main").hide();
    $("#updateDialog").hide();
    $("#updateByIdDialog").hide();
    $("#addDialog").hide();
    $("#deleteUserDialog").show();
}

//删除用户信息

function deleteusers(id) {
    var userId = id;
    // 发送PUT请求

    // 发送PUT请求
    $.ajax({
        url: '/deleteUser',
        type: 'POST',
        contentType: 'application/json', // 指定内容类型为 JSON
        data: JSON.stringify(userId),
        dataType: "json",
        success: function (data) {
            // 处理成功响应
            console.log('删除成功:', data);
            alert('用户删除成功！');

            $.ajax({
                url: "/users",
                type: "POST",
                success: function (res) {
                    console.log(res.data);
                    if (res.code === 200) {
                        var users = res.data;
                        console.log(users);
                        var str = "";
                        for (var i = 0; i < users.length; i++) {
                            str += "<tr><td>" + users[i].userId + "</td><td>" + users[i].userName + "</td>" +
                                "<td><button type=\"button\" onclick='deleteusers(" + users[i].userId + ")'>删除</button></td></tr>"
                        }
                        $("#tab1").html(str);
                    }
                },
                error: function () {
                    alert("服务器出错！");
                }
            })

        },
        error: function (jqXHR, textStatus, errorThrown) {
            // 处理错误
            // console.error('更新失败:', textStatus, errorThrown);
            // alert('更新失败，请稍后重试。');
        }
    });

    $.ajax({
        url: "/users",
        type: "POST",
        success: function (res) {
            console.log(res.data);
            if (res.code === 200) {
                var users = res.data;
                console.log(users);
                var str = "";
                for (var i = 0; i < users.length; i++) {
                    str += "<tr><td>" + users[i].userId + "</td><td>" + users[i].userName + "</td>" +
                        "<td><button type=\"button\" onclick='deleteusers(" + users[i].userId + ")'>删除</button></td></tr>"
                }
                $("#tab1").html(str);
            }
        },
        error: function () {
            // alert("服务器出错！");
        }
    })


}

function addProduct() {
    var productid = null;
    var productname = $("#addName").val();
    var productcategory = $("#addCategory").val();
    var productpurchase = $("#addPurchase").val();
    var productselling = $("#addSelling").val();
    var productquantity = $("#addQuantity").val();
    var entrytime = $("#addETime").val();
    var updatetime = $("#addUTime").val();
    var judgment = $("#addReturn").val();
    var userid = $("#addUserId").val();
    var salesstatus = $("#addStatus").val();
    var isreturn = null;
    if (judgment === "是") {
        isreturn = true;
    } else {
        isreturn = false;
    }
    var product = {
        "productId": productid,
        "productName": productname,
        "productCategory": productcategory,
        "productPurchase": productpurchase,
        "productSelling": productselling,
        "productQuantity": productquantity,
        "entryTime": entrytime,
        "updateTime": updatetime,
        "isReturn": isreturn,
        "userId": userid,
        "salesStatus": salesstatus
    }
    $.ajax({
        url: "/add",
        type: "POST",
        data: product,
        dataType: "json",
        success: function (res) {
            console.log(res);
            if (res.code === 200) {
                confirm(res.message);
                $("#addDialog").hide();
                $("#main").show();
                queryProductsInfo();
            }
        },
        error: function () {
            alert("服务器出错！");
        }
    })
}

function updateProduct() {
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
    if (productid === "") {
        alert("请输入产品编号！");
        return;
    }
    if (productname === ""){
        alert("请输入产品名称！");
        return;
    }
    if (judgment === "是") {
        isreturn = true;
    } else {
        isreturn = false;
    }

    var product = {
        "productId": productid,
        "productName": productname,
        "productCategory": productcategory,
        "productPurchase": productpurchase,
        "productSelling": productselling,
        "productQuantity": productquantity,
        "isReturn": isreturn,
        "userId": userid,
        "salesStatus": salesstatus
    };
    // 发送PUT请求
    $.ajax({
        url: '/updateProduct',
        type: 'POST',
        contentType: 'application/json', // 指定内容类型为 JSON
        data: JSON.stringify(product),
        dataType: "json",
        success: function (data) {
            // 处理成功响应
            console.log('更新成功:', data);
            alert('产品更新成功！');
            // 在这里可以更新前端界面，例如刷新产品列表或更新某些字段
            queryProductsInfo();
            $("#updateDialog").hide();
        },
        error: function (jqXHR, textStatus, errorThrown) {
            // 处理错误
            console.error('更新失败:', textStatus, errorThrown);
            alert('更新失败，请稍后重试。');
        }
    });

}


function deleteProducts(id) {
    var isDelete = confirm("请确认是否删除这些记录？");
    var productid = id;
    console.log(productid);
    if (isDelete) {
        $.ajax({
            url: '/deleteProduct',
            type: 'POST',
            contentType: 'application/json', // 指定内容类型为 JSON
            data: JSON.stringify(productid),
            dataType: "json",
            success: function (data) {
                // 处理成功响应
                console.log('删除成功:', data);
                alert('产品删除成功！');
                queryProductsInfo();
            },
            error: function (jqXHR, textStatus, errorThrown) {
                // 处理错误
                // console.error('更新失败:', textStatus, errorThrown);
                // alert('更新失败，请稍后重试。');
            }
        });


    }
}


function resetAll() {
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

function openOperateDialog() {
    $("#updateByIdDialog").hide();
    $("#userInformationDialog").hide();
    $("#deleteUserDialog").hide();
    $("#updateDialog").hide();
    $("#addDialog").hide();
    $("#main").show();
}

function openAddDialog() {
    $("#updateByIdDialog").hide();
    $("#userInformationDialog").hide();
    $("#deleteUserDialog").hide();
    $("#main").hide();
    $("#updateDialog").hide();
    $("#addDialog").show();
    var userId1 = localStorage.getItem("userId");
    $("#addUserId").val(userId1);
}

function openUpdateByIdDialog() {
    $("#userInformationDialog").hide();
    $("#deleteUserDialog").hide();
    $("#main").hide();
    $("#addDialog").hide();
    $("#updateDialog").hide();
    $("#updateByIdDialog").show();
}
function openUpdateDialog(product) {
    $("#updateByIdDialog").hide();
    $("#userInformationDialog").hide();
    $("#deleteUserDialog").hide();
    $("#main").hide();
    $("#addDialog").hide();
    $("#updateDialog").show();

    var judgment = null;
    if (product.isReturn) {
        judgment = "是";
    } else {
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

function openUserInformationDialog() {
    $("#deleteUserDialog").hide();
    $("#updateByIdDialog").hide();
    $("#addDialog").hide();
    $("#updateDialog").hide();
    $("#main").hide();
    $("#userInformationDialog").show();
}

function updatePassword() {
    var oldPassword = $("#oldPassword").val();
    var newPassword = $("#newPassword").val();
    var confirmPassword = $("#confirmNewPassword").val();
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[A-Za-z\d]{8,}$/;
    if (!passwordRegex.test(newPassword)) {
        alert("密码必须包含大写字母、小写字母和数字，并且长度至少为8个字符！");
        return;
    }
    if (newPassword !== confirmPassword) {
        alert("两次密码不一致！");
        return;
    }
    var userId = localStorage.getItem("userId");
    var newUser = {
        "userId": userId,
        "oldPassword": oldPassword,
        "newPassword": newPassword
    }
    $.ajax({
        url: "/updatePassword",
        type: "POST",
        contentType: 'application/json',
        data: JSON.stringify(newUser),
        dataType: "json",
        success: function (res) {
            if (res.code === 200) {
                alert("密码修改成功！");
                $("#userInformationDialog").hide();
                $("#main").show();
            }
        },
        error: function (res) {
            if (res.code === 400){
                alert("原密码错误！");
            }else if (res.code === 401){
                alert("新旧密码不能相同！");
            }
            alert("密码修改失败！");
        }
    })
}

