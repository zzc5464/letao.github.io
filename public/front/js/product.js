/**
 * Created by zzc on 2017/11/2.
 */

var id = t.getParam("productId");
$.ajax({
    type:'get',
    url:'/product/queryProductDetail',
    data:{
        id:id
    },
    success: function (data) {
        console.log(data);
        var nowSize = [];
        var sizeArr = data.size.split("-");
        for(var i=sizeArr[0];i<=sizeArr[1];i++) {
            nowSize.push(i);
        }
        data.sizeLen = nowSize;
        $(".mui-scroll").html( template("proTmp",data) );

        mui(".mui-numbox").numbox();
        mui(".mui-scroll-wrapper").scroll({
            indicators:false
        })

        mui('.mui-slider').slider({
            interval:5000//自动轮播周期，若为0则不自动播放，默认为0；
        });
    }
})

//选择尺寸功能
$(".mui-scroll").on("click",".sizeItem", function () {
    $(this).addClass("current").siblings().removeClass("current");
})

//购物车功能
$(".mui-btn-danger").on("click", function () {
    var size = $(".sizeItem.current").html();
    var num = $(".mui-numbox-input").val();
    if(size) {
        $.ajax({
            type:"post",
            url:"/cart/addCart",
            data:{
                productId:id,
                size:size,
                num:num
            },
            success: function (data) {
                if(data.success) {
                    mui.toast("加入成功，快剁手吧")
                }else {
                    location.href = "login.html?hrefAddr="+location.href;
                }
            }
        })
    }else {
        mui.toast("请选择尺码啊大兄弟")
    }
})