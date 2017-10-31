/**
 * Created by zzc on 2017/10/29.
 */
//分页
;(function () {
    var current = 1;
    var pages = 5;
    function render(){
        $.ajax({
            type:"get",
            url:"/user/queryUser",
            data:{
                page:current,
                pageSize:pages
            },
            success: function (data) {
                console.log(data);
                var html = template("tmp",data);
                $("tbody").html(html);
                $(".user_pages").bootstrapPaginator({
                    bootstrapMajorVersion:3,//默认是2，如果是bootstrap3版本，这个参数必填
                    currentPage:current,//当前页
                    totalPages:Math.ceil(data.total/pages),//总页数
                    size:"small",//设置控件的大小，mini, small, normal,large
                    onPageClicked:function(event, originalEvent, type,page){
                        //为按钮绑定点击事件 page:当前点击的按钮值
                        console.log(page);
                        current = page;
                        render();
                    }
                });
            }
        })
    }
    render();

    $("tbody").on("click",".btn", function () {

        var id = $(this).parent().data("id");
        var status = $(this).parent().data("status");
        $("#lt_statusMod").modal("show");
        $("#status_change").off().on("click", function () {
            status = status==1?"0":"1";
            $.ajax({
                type:"post",
                url:"/user/updateUser",
                data:{
                    id:id,
                    isDelete:status
                },
                success: function (data) {
                    if(data.success) {
                        $("#lt_statusMod").modal("hide");
                        render();
                    }
                }
            })
        })
    })
})();