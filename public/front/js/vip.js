/**
 * Created by zzc on 2017/11/4.
 */

$.ajax({
    type:'get',
    url:'/user/queryUserMessage',
    success: function (data) {
        t.checkLogin(data);
        $(".user_info").html( template("userTmp",data) );
    }
})

$("#loginOut").on("click",function(){
    mui.confirm("确定要退出登录吗？","皇上",["跪安","等会"], function (e) {
        console.log(e.index);
        if(e.index == 0) {
            $.ajax({
                type:'get',
                url:'/user/logout',
                success: function (data) {
                    if(data.success) {
                        mui.toast("退出成功");
                        location.href = "login.html";
                    }
                }
            })
        }
    })
})