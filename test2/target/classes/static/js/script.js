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