$(document).ready(function (){
    queryProductsInfo();


    //做完queryProductsInfo()再把下面这个注释去掉

    // 监听全选复选框的变化
    $("#selectAll").change(function() {
        var isChecked = $(this).is(":checked"); // 获取全选复选框的状态
        // 设置所有行的复选框状态
        $('#tab input[type="checkbox"]').prop("checked", isChecked);
    });
})

function queryProductsInfo(){
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
                    str += "<tr><td><input type=\"checkbox\"></td><td>"+products[i].productId+"</td><td>"+products[i].productName+"</td>" +
                        "<td>"+products[i].productCategory+"</td><td>"+products[i].productPurchase+"</td><td>"+products[i].productSelling+"</td>" +
                        "<td>"+products[i].productQuantity+"</td><td>"+products[i].entryTime+"</td><td>"+products[i].updateTime+"</td>" +
                        "<td>"+judgment+"</td><td>"+products[i].userId+"</td><td>"+products[i].salesStatus+"</td>" +
                        "<td><button type=\"button\" onclick='openUpdateDialog("+JSON.stringify(products[i])+")'>修改</button>" +
                        "<button type=\"button\" onclick='deleteProducts("+products[i].productId+")'>删除</button></td></tr>"
                }
                $("#tab").html(str);
            }
        },
        error:function (){
            alert("服务器出错！");
        }
    })
}


function addProduct(){

}



function updateProduct(){

}


function deleteProducts(){
    var isDelete= confirm("请确认是否删除这些记录？");
    if (isDelete){

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

/*register*/
$(document).ready(function () {
    // 提交按钮点击事件
    $('#submitBtn').click(function () {
        // 获取表单数据
        const username = $('#username').val().trim();
        const password = $('#password').val().trim();
        const confirmPassword = $('#confirmPassword').val().trim();
        const inviteCode = $('#inviteCode').val().trim();
        const enteredCaptcha = $('#captchaInput').val().trim();
        const displayedCaptcha = $('#captcha').text().trim();

        // 验证验证码
        if (enteredCaptcha !== displayedCaptcha) {
            $('#error').text("验证码错误，请重试！");
            return;
        }

        // 验证密码是否一致
        if (password !== confirmPassword) {
            $('#error').text("两次输入的密码不一致！");
            return;
        }

        // 准备提交的数据
        const postData = {
            userName: username,
            userPassword: password,
            inviteCode: inviteCode
        };

        // AJAX 提交数据
        $.ajax({
            url: "/register",
            type: "POST",
            contentType: "application/json",
            data: JSON.stringify(postData),
            dataType: "json",
            success: function (res) {
                if (res.code === 200) {
                    alert("注册成功！");
                    window.location.href = "/page/login.html"; // 跳转到登录页面
                } else {
                    $('#error').text(res.message || "注册失败，请重试！");
                }
            },
            error: function () {
                alert("服务器出错!");
            }
        });

        // 清空错误信息
        $('#error').text("");
    });

    // 初始化验证码
    generateCaptcha();
});
// 生成随机验证码
function generateCaptcha() {
    const captcha = Math.random().toString(36).substring(2, 8);
    $('#captcha').text(captcha);
}



/*
/!*login*!/
        $(document).ready(function () {
    // 点击登录按钮时触发
    $('#loginBtn').on('click', function (event) {
        event.preventDefault(); // 阻止默认行为

        // 获取用户输入的用户名和密码
        const username = $('#username').val().trim();
        const password = $('#password').val().trim();

        // 检查输入是否为空
        if (!username || !password) {
            $('#errorMessage').text('用户名或密码不能为空！');
            return;
        }

        // 发送 AJAX 请求
        $.ajax({
            url: '/login', // 后端登录接口
            type: 'POST',
            contentType: 'application/json', // 发送 JSON 数据
            data: JSON.stringify({
                "username": username,
                "password": password
            }),
            dataType:"json",
            success: function (response) {
                if (response.code === 200) {
                    alert('登录成功！');
                    window.location.href = '/page/index.html'; // 跳转到首页
                } else {
                    $('#errorMessage').text(response.message || '登录失败，请重试！');
                }
            },
            error: function () {
                $('#errorMessage').text('服务器错误，请稍后重试！');
            }
        });
    });
});
*/
/*login*/
$(document).ready(function () {
    // 点击登录按钮时触发
    $('#loginBtn').on('click', function (event) {
        event.preventDefault(); // 阻止默认行为

        // 获取用户输入的用户名和密码
        const username = $('#username').val().trim();
        const password = $('#password').val().trim();

        // 检查输入是否为空
        if (!username || !password) {
            $('#errorMessage').text('用户名或密码不能为空！');
            return;
        }

        // 发送 AJAX 请求
        $.ajax({
            url: '/login', // 后端登录接口
            type: 'POST',
            contentType: 'application/json', // 发送 JSON 数据
            dataType:"json",
            data: JSON.stringify({
                "username": username,
                "password": password
            }),
            success: function (res) {
                if (res.code === 200) {
                    alert('登录成功！');
                    window.location.href = '/page/index.html'; // 跳转到首页
                } else {
                    $('#errorMessage').text(res.message || '登录失败，请重试！');
                }
            },
            error: function () {
                $('#errorMessage').text('服务器错误，请稍后重试！');
            }
        });
    });
});

