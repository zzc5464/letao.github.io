/**
 * Created by zzc on 2017/10/29.
 */
;(function () {
 var form = $("#login-form");
    form.bootstrapValidator({

        //校验时使用的图标
        feedbackIcons: {
            valid: 'glyphicon glyphicon-ok',
            invalid: 'glyphicon glyphicon-remove',
            validating: 'glyphicon glyphicon-refresh'
        },

        //配置校验规则
        fields:{
            //配置所有的字段的规则,对应表单中的name属性
            username:{
                validators:{
                    notEmpty:{
                        message:"用户名不能为空"
                    },
                    callback:{
                        message:"没有这个帅逼"
                    }
                }
            },
            password:{
                validators:{
                    notEmpty:{
                        message:"用户密码不能为空"
                    },
                    stringLength:{
                        min:6,
                        max:12,
                        message:"用户密码必须是6-12位"
                    },
                    callback:{
                        message:"密码不对哦帅逼"
                    }
                }
            }
        }
    });
    var validator = form.data("bootstrapValidator");
    form.on('success.form.bv', function (e) {
        e.preventDefault();
        $.ajax({
            type:'post',
            url:'/employee/employeeLogin',
            data:form.serialize(),
            success: function (data) {
                console.log(data);
                if(data.success) {
                    location.href = "index.html"
                }
                if(data.error == 1000) {
                    validator.updateStatus("username", "INVALID", "callback");
                }else {
                    validator.updateStatus("password", "INVALID", "callback");
                }
            }
        })
    })
    $("button[type='reset']").on('click', function () {
        validator.resetForm();
        console.log(11);
    })
})();