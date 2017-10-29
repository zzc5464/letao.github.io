;(function(){
    //判断用户是否登录
    if(location.href.indexOf("login.html") === -1) {
        $.ajax({
            type:"get",
            url:'/employee/checkRootLogin',
            success: function (data) {
                if(data.error) {
                    location.href = "login.html";
                }
            }
        })
    }
})();
;(function () {
    $(document).ajaxStart(function () {
        NProgress.start();
    });
    $(document).ajaxStop(function () {
        setTimeout(function () {
            NProgress.done();
        }, 500);
    });
})();
;(function () {
    $('.lt_cate').on("click",function(){
        $(".cate_son").slideToggle();
    });

    $(".top_left_icon").on("click", function () {
        $(".aside").toggleClass("active");
        $("section").toggleClass("active");
    })

    $("#quit").on('click', function () {
        $.ajax({
            type:'get',
            url:'/employee/employeeLogout',
            success: function (data) {
                if(data.success) {
                    location.href = "login.html";
                }
            }
        })
    })
})();