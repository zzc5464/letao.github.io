
//获取localStorage,渲染到页面上

render();
function getHs(){
    var hs = localStorage.getItem("hs")||"[]";
    var hsArr = JSON.parse(hs);
    return hsArr;
}
function render(){
    var hsArr = getHs();
    console.log(hsArr);
    $(".history").html( template('hsTmp',{hsArr:hsArr}) );
}

//删除数据
$(".history").on("click",".mui-pull-right", function () {
    localStorage.removeItem("hs");
    render();
})
//删除单条数据
$(".history").on("click",".fa-close", function () {
    var btnArr = ["算了","删吧"];
    mui.confirm("你确定要删除这条记录吗","警告", btnArr, function (data) {
        console.log(data);
        if(data.index==1) {
            var hsArr = getHs();
            var i = $(this).data("index");
            hsArr.splice(i,1);
            localStorage.setItem('hs',JSON.stringify(hsArr));
            render();
        }
    })
})
//添加一条
$(".mui-btn-blue").on("click", function () {
    var val = $(".search_text").val().trim();
    if(val=='') {
        mui.alert("亲，你想买啥", "温馨提示");
        $(".search_text").val('');
        return;
    }
    var hs = getHs();
    //判断是否在原来有
    var index = hs.indexOf(val);
    if(index>-1) {
        hs.splice(index,1);
    }
    //判断是否超过10
    if(hs.length>=10) {
        hs.pop();
        //hs.unshift(val);
    }
    hs.unshift(val);
    localStorage.setItem('hs',JSON.stringify(hs));
    render();

    //页面跳转
    location.href = "searchList.html?key="+val;
})