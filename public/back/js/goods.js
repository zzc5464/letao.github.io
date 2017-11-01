/**
 * Created by zzc on 2017/10/31.
 */
var currentPage = 1;
var pageSize = 8;
var $form = $("#form");
//页数和模板数据
function render(){
    $.ajax({
        type:"get",
        url:"/product/queryProductDetailList",
        data:{
            page:currentPage,
            pageSize:pageSize
        },
        success:function (data) {
            $("tbody").html( template("tpl", data) );
            //渲染分页
            $("#paginator").bootstrapPaginator({
                bootstrapMajorVersion: 3,
                currentPage: currentPage,
                totalPages: Math.ceil(data.total / pageSize),
                size: "small",
                onPageClicked(a, b, c, page){
                    currentPage = page;
                    render();
                }
            });
        }
    });
}
render();

//模态框显示
//二级列表渲染
//点击添加，显示模态框
$("#add_btn").on("click", function () {
    $("#lt_statusMod").modal("show");
    //渲染二级分类列表
    $.ajax({
        type:"get",
        url:"/category/querySecondCategoryPaging",
        data:{
            page:1,
            pageSize:100
        },
        success:function (data) {
            $(".dropdown-menu").html( template("goods_tmp", data) );

        }
    });
});

//更改伪下拉菜单的值
$(".dropdown-menu").on("click", "li", function () {

    //获取a标签的文本，设置给dropdown-text
    $(".dropdown-text").text(  $(this).text()  );
    //获取到自定义属性data-id,设置给隐藏域
    $("#brandId").val(  $(this).data("id") );

    //改成通过状态
    $form.data("bootstrapValidator").updateStatus("brandId", "VALID");
});

var imgArr = [];
//初始化产品图片上传
$("#fileupload").fileupload({
    dataType:"json",
    done:function (e, data) {
        //上传成功，将图片添加到img_box中
        $(".img_box").append('<img src="'+data.result.picAddr+'" width="100" height="100">');
        imgArr.push(data.result);
        if (imgArr.length === 3) {
            $form.data("bootstrapValidator").updateStatus("productLogo", "VALID");
        } else {
            $form.data("bootstrapValidator").updateStatus("productLogo", "INVALID");
        }
    }
    //picAddr   picName


});

console.log(imgArr);

$form.bootstrapValidator({
    //默认不校验的配置
    excluded:[],
    feedbackIcons: {
        valid: 'glyphicon glyphicon-ok',
        invalid: 'glyphicon glyphicon-remove',
        validating: 'glyphicon glyphicon-refresh'
    },
    fields:{
        brandId:{
            validators:{
                notEmpty:{
                    message:"请选择二级分类"
                }
            }
        },
        proName:{
            validators:{
                notEmpty:{
                    message:"请输入商品名称"
                }
            }
        },
        proDesc:{
            validators:{
                notEmpty:{
                    message:"请输入商品描述"
                }
            }
        },
        num:{
            validators:{
                notEmpty:{
                    message:"请输入商品库存"
                },
                regexp:{
                    //必须是0以上的数字
                    regexp:/^[1-9]\d*$/,
                    message:"请输入一个大于0的库存"
                }
            }
        },
        size:{
            validators:{
                notEmpty:{
                    message:"请输入商品尺寸"
                },
                regexp:{
                    //33-55
                    regexp:/^\d{2}-\d{2}$/,
                    message:"请输入正确的尺码（30-50）"
                }
            }
        },
        oldPrice:{
            validators:{
                notEmpty:{
                    message:"请输入商品的原价"
                }
            }
        },
        price:{
            validators:{
                notEmpty:{
                    message:"请输入商品的折扣价"
                }
            }
        },
        productLogo: {
            validators: {
                notEmpty: {
                    message: "请上传3张商品图片"
                }
            }
        }
    }
});

$form.on("success.form.bv",function(e){
    e.preventDefault();
    var param = $form.serialize();
    param += "&picName1="+imgArr[0].picName+"&picAddr1="+imgArr[0].picAddr;
    param += "&picName2="+imgArr[1].picName+"&picAddr2="+imgArr[1].picAddr;
    param += "&picName3="+imgArr[2].picName+"&picAddr3="+imgArr[2].picAddr;
    console.log(param);
    //brandId=7&status=0&proName=addas&proDesc=1223&num=444&size=33-44&oldPrice=43333&price=3222&productLogo=&picName1=a7701490-bec3-11e7-9fc6-6309702c792d.jpg&picAddr1=/upload/product/a7701490-bec3-11e7-9fc6-6309702c792d.jpg&picName2=a770b0d0-bec3-11e7-9fc6-6309702c792d.jpg&picAddr2=/upload/product/a770b0d0-bec3-11e7-9fc6-6309702c792d.jpg&picName3=a9596e00-bec3-11e7-9fc6-6309702c792d.jpg&picAddr3=/upload/product/a9596e00-bec3-11e7-9fc6-6309702c792d.jpg
    $.ajax({
        type:"post",
        url:'/product/addProduct',
        data:param,
        success: function (data) {
            if(data.success) {
                $("#lt_statusMod").modal("hide");
                currentPage = 1;
                render();

                $form[0].reset();
                $form.data("bootstrapValidator").resetForm();

                $(".dropdown-text").text("请选择二级分类");
                $(".img_box img").remove();
                imgArr = [];
            }
        }
    })
})