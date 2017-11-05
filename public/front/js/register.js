/**
 * Created by zzc on 2017/11/4.
 */
$("#getVCode").on("click", function () {
    var $this = $(this);
    var timer = null;
    if($this.hasClass("now")) {
        return false;
    }
    $this.addClass("now").html("正在发送");
    $.ajax({
        url:'/user/vCode',
        type:'get',
        success: function (data) {
            console.log(data);
            var num = 5;
            timer = setInterval(function () {
                num--;
                $this.html("还有"+num+"秒可以点");
                if(num<1) {
                    $this.removeClass("now").html("再来一发");
                    clearInterval(timer);
                }
            },1000)
        }
    })
})


$(".btn_register").on("click", function () {
    /*
    * username
    * password
    * mobile
    * vCode
    * */
    var username = $("[name='username']").val();
    var password = $("[name='password']").val();
    var mobile = $("[name='mobile']").val();
    var vCode = $("[name='vCode']").val();
    var repassword = $("[name='repassword']").val();

    if(username.trim()=="") {
        mui.toast("请输入用户名");
        $("[name='username']").val("");
        return;
    }
    if(!repassword) {
        mui.toast("请确认密码");
        return;
    }
    if(!password) {
        mui.toast("请输入密码");
        return;

    }
    if(password!=repassword) {
        mui.toast("请输入相同的密码");
        return;

    }
    if(mobile.trim()=="") {
        mui.toast("请输入手机号");
        $("[name='mobile']").val("");
        return;

    }
    var tel = /^1[34578]\d{9}$/;
    if(!tel.test(mobile)) {
        mui.toast("请输入正常人的手机号");
        return;

    }
    if(vCode.trim()=="") {
        mui.toast("请输入验证码");
        $("[name='vCode']").val("");
        return;

    }
    var vCodeCheck = /^\d{6}$/;
    if(!vCodeCheck.test(vCode)) {
        mui.toast("请输入6位验证码");
        return;

    }
    $.ajax({
        type:"post",
        url:"/user/register",
        data:{
            username:username,
            password:password,
            mobile:mobile,
            vCode:vCode
        },
        success: function (data) {
            if(data.success) {
                mui.toast("欢迎来到我的世界");
                location.href = "login.html";
            }else {
                mui.toast("错了，傻逼");
            }
        }
    })
})