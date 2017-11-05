/**
 * Created by zzc on 2017/11/4.
 */
mui.init({
    pullRefresh : {
        container:".goods_box",//下拉刷新容器标识，querySelector能定位的css选择器均可，比如：id、.class等
        down : {
            style:'circle',//必选，下拉刷新样式，目前支持原生5+ ‘circle’ 样式
            color:'#2BD009', //可选，默认“#2BD009” 下拉刷新控件颜色
            //height:'50px',//可选,默认50px.下拉刷新控件的高度,
            //range:'100px', //可选 默认100px,控件可下拉拖拽的范围
            offset:'0px', //可选 默认0px,下拉刷新控件的起始位置
            auto: true,//可选,默认false.首次加载自动上拉刷新一次
            callback :function(){
                $.ajax({
                    type:'get',
                    url:'/cart/queryCart',
                    success: function (data) {
                        t.checkLogin(data);
                        console.log(data);
                        setTimeout(function () {
                            $("#OA_task_2").html( template("goodsTmp",{data:data}) )
                            mui(".goods_box").pullRefresh().endPulldownToRefresh();
                        },1000)
                    }
                })
            } //必选，刷新函数，根据具体业务来编写，比如通过ajax从服务器获取新数据；
        }
    }
});

//做删除功能
$(".goods_box").on("tap",".btn_del", function () {
    var id = $(this).data("id");
    mui.confirm("确定删除吗?","提示",["否","是"],function (e) {
        if(e.index==1) {
            $.ajax({
                type: "get",
                url: '/cart/deleteCart',
                data:{
                    id:[id]
                    //接口规定是一个数组
                },
                success: function (data) {
                    console.log(data);
                    if(data.success) {
                        mui(".goods_box").pullRefresh().pulldownLoading();
                    }
                }
            })
        }

    })
})

//编辑功能
$(".goods_box").on("tap",".btn_edit", function () {
    var data = this.dataset;
    var html = template("editTmp",data);
    html = html.replace(/\n/g,"");
    mui.confirm(html,"改把老大",["好的","不要"], function (e) {
        if(e.index ==0) {
            $.ajax({
                type:'post',
                url:'/cart/updateCart',
                data:{
                    id:data.id,
                    size:$(".size span.current").html(),
                    num:$(".mui-numbox-input").val()
                },
                success: function (data) {
                    console.log(data);
                    if(data.success) {
                        mui(".goods_box").pullRefresh().pulldownLoading();
                    }else {

                    }

                }
            })
        }


    })

    //在点击修改按钮后 重新渲染mui数字框  给尺码注册点击事件
    mui(".mui-numbox").numbox();
    $(".size span").on("tap", function () {
        $(this).addClass("current").siblings().removeClass("current");
    });
})


//计算总计金额
$(".goods_box").on("click",".check_goods", function () {
    var sum = 0;
    $(":checked").each(function (i,e) {
        sum+= $(this).data("num") *$(this).data("price");
    })
    sum = sum.toFixed(2);
    $(".sum").html(sum);
})


