/**
 * Created by zzc on 2017/11/1.
 */
$.ajax({
    type:"get",
    url:'/category/queryTopCategory',
    success: function (data) {
        var html = template("tpl",data);
        $(".lt_category_l ul").html(html);
        var id = data.rows[0].id
        renderSec(id);
    }
})

function renderSec(id) {
    $.ajax({
        type:'get',
        url:'/category/querySecondCategory',
        data:{
            id:id
        },
        success: function (data) {
            var html = template("secTmp",data);
            $(".lt_category_r ul").html(html);
        }
    })
}

$(".lt_category_l ul").on("click","li", function () {
    var id = $(this).data("id");
    $(this).addClass("now").siblings().removeClass("now");
    renderSec(id);

})