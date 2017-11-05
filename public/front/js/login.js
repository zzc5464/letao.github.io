/**
 * Created by zzc on 2017/11/4.
 */
$(function () {

    var hrefAddr = location.search;//.replace("?hrefAddr=","")
    $(".mui-btn-primary").on("click", function () {
        var user = $("[name=username]").val();
        var password = $("[name=password]").val();
        if(!user) {
            mui.toast("账号不能为空");
            return false;
        }
        if(!password) {
            mui.toast("密码不能为空");
            return false;
        }
        //itcast   111111
        $.ajax({
            type:"post",
            url:"/user/login",
            data:{
                username:user,
                password:password
            },
            success: function (data) {
                if(data.success) {
                    if(hrefAddr.indexOf('hrefAddr')>-1) {
                        hrefAddr = hrefAddr.replace("?hrefAddr=","");
                        location.href = hrefAddr;
                    }else {
                        location.href = "vip.html";
                    }
                }else {
                    mui.toast("登录失败，重试");
                }
            }
        })
    })

})