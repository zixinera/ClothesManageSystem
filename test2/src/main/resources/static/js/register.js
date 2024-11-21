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
      // 验证密码是否符合要求（至少包含一个大写字母，一个小写字母和一个数字）
        const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[A-Za-z\d]{8,}$/;
        if (!passwordRegex.test(password)) {
            $('#error').text("密码必须包含大写字母、小写字母和数字，并且长度至少为8个字符！");
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
