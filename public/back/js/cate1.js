/**
 * Created by zzc on 2017/10/31.
 */
//分页
;(function () {
    var current = 1;
    var pages = 2;
    function render(){
        $.ajax({
            type:"get",
            url:"/category/queryTopCategoryPaging",
            data:{
                page:current,
                pageSize:pages
            },
            success: function (data) {
                var html = template("tmp",data);
                $("tbody").html(html);
                $(".user_pages").bootstrapPaginator({
                    bootstrapMajorVersion:3,//默认是2，如果是bootstrap3版本，这个参数必填
                    currentPage:current,//当前页
                    totalPages:Math.ceil(data.total/pages),//总页数
                    size:"small",//设置控件的大小，mini, small, normal,large
                    onPageClicked:function(event, originalEvent, type,page){
                        //为按钮绑定点击事件 page:当前点击的按钮值
                        current = page;
                        render();
                    }
                });
            }
        })
    }
    render();

    //模态框
    $("#add_btn").on("click", function () {
        $("#lt_statusMod").modal("show");
    });
    //表单验证
    var form = $("#form");
    form.bootstrapValidator({
        feedbackIcons: {//校验时候使用的图标
            valid: 'glyphicon glyphicon-ok',//成功
            invalid: 'glyphicon glyphicon-remove',//失败
            validating: 'glyphicon glyphicon-refresh'//重置
        },
        fields:{
            categoryName:{
                validators:{
                    notEmpty:{
                        message:"一级分类不能为空"
                    }
                }
            }
        }
    })
    form.on("success.form.bv", function (e) {
        e.preventDefault();
        console.log(11);
        $.ajax({
            type:"post",
            url:'/category/addTopCategory',
            data:form.serialize(),
            success: function (data) {
                if(data.success) {
                    $("#lt_statusMod").modal("hide");
                    current =1;
                    render();
                    form.data('bootstrapValidator').resetForm();
                    form[0].reset();
                }
            }
        })
    })
})();