/**
 * Created by zzc on 2017/10/31.
 */
//分页
;(function () {
    var current = 1;
    var pages = 4;
    function render(){
        $.ajax({
            type:"get",
            url:"/category/querySecondCategoryPaging",
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


    //模态框中一级分类的数据 cart_one_tmp
    $.ajax({
        type:'get',
        url:'/category/queryTopCategoryPaging',
        data:{
          page:1,
          pageSize:1000
        },
        success: function (data) {
            $(".cate-one-box").html( template("cart_one_tmp",data) );
        }
    })
    //给选择第一个分类的下拉绑定数据
    $(".dropdown-menu").on("click",".cateName",function(){
        var txt = $(this).text();
        var cate_id = $(this).data("id");
        $("#cate1").text(txt);
        $("#categoryId").val(cate_id);
        $form.data("bootstrapValidator").updateStatus("categoryId", "VALID");
    });
    //初始化上传图片插件
    $("#fileupload").fileupload({
        dataType:"json",

        //当文件上传成功时，会执行这个回调函数
        done:function (e, data) {
            //获取文件上传结果
            //给默认图片设置src
            console.log(data);
            //一定要加upload文件夹，不然会报错的
            $(".uploadImg img").attr("src", data.result.picAddr);
            $("#brandLogo").val( data.result.picAddr );
            $form.data("bootstrapValidator").updateStatus("brandLogo", "VALID");
        }
    });


    //二级表单验证，这里不用验证一级表单了，直接换掉
    var $form = $("#form");
    $form.bootstrapValidator({
        //默认不校验的配置
        excluded:[],
        feedbackIcons: {
            valid: 'glyphicon glyphicon-ok',
            invalid: 'glyphicon glyphicon-remove',
            validating: 'glyphicon glyphicon-refresh'
        },
        fields:{
            categoryId:{
                validators:{
                    notEmpty:{
                        message:"请选择一级分类"
                    }
                }
            },
            brandName:{
                validators:{
                    notEmpty:{
                        message:"请输入二级分类的名称"
                    }
                }
            },
            brandLogo:{
                validators:{
                    notEmpty:{
                        message:"请上传图片"
                    }
                }
            }
        }
    });

    $form.on("success.form.bv", function (e) {
        e.preventDefault();

        //发送ajax请求，把二级分类存起来
        $.ajax({
            type:"post",
            url:"/category/addSecondCategory",
            data:$form.serialize(),
            success:function (data) {
                if(data.success){
                    console.log(data);
                }
            }
        });
    })

})();