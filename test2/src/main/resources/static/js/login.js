/*login*/
        $(document).ready(function () {
    // 点击登录按钮时触发
    $('#loginBtn').on('click', function (event) {
        event.preventDefault(); // 阻止默认行为

        // 获取用户输入的用户名和密码
        const username = $('#username').val().trim();
        const password = $('#password').val().trim();
        const userrole = null;
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
                "password": password,
                "userRole": userrole
            }),
            dataType:"json",
            success: function (response) {
                if (response.code === 200) {
                    var user = response.data;// 获取当前用户的角色
                    localStorage.setItem("currentRole", user.userRole);
                    localStorage.setItem("userId", user.userId);
                    sessionStorage.setItem("sessionLogin","true");
                    alert('登录成功！');
                    window.location.href = '/page/index.html';// 跳转到首页
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