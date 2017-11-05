/**
 * Created by zzc on 2017/11/2.
 */
//封装ajax
class Render {
    constructor(){

    }
    send( options ){
        $.ajax({
            type:"get",
            url:'/product/queryProduct',
            data:{
                page:options.page,
                pageSize:options.pageSize,
                price:options.price,
                num:options.num,
                proName:options.proName,
                brandId:options.brandId
            },
            success: function (data) {
                console.log(data);
                $(".product ul").html( template("proTmp",data) )
            }
        })
    }
}
var key = t.getParam("key");
$(".search_text").val(key);

var options = {
    page:1,
    pageSize:10,
    price:'',
    num:'',
    proName:'',
    brandId:''
}
//跳转后渲染页面
options.proName = key;
var r = new Render();
r.send( options );

//搜索功能
$(".mui-btn-blue").on("click", function () {
    var val = $(".search_text").val();
    options.proName = val;
    r.send( options );
})
//排序功能
$(".serach_menu a[data-type]").on('click', function () {
    options.num = "";
    options.price = "";
    var $this = $(this);
    var $i = $(this).find("i");
    if($this.hasClass("now")) {
        $this.find("i").toggleClass("fa-angle-down").toggleClass("fa-angle-up");
    }else {
        $this.addClass("now").siblings().removeClass("now");
        $i.removeClass("fa-angle-up").addClass("fa-angle-down");
    }
    var type = $this.data("type");
    var val = $i.hasClass("fa-angle-down")?2:1;
    options[type] = val;
    r.send(options);
})
