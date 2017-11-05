/**
 * Created by zzc on 2017/11/1.
 */
var sc = mui('.mui-scroll-wrapper').scroll({
    indicators: false,
    deceleration: 0.0005 //flick 减速系数，系数越大，滚动速度越慢，滚动距离越小，默认值0.0006
});

//工具类
class Tool {
    constructor(){}
    getParamObj(){
        var search = location.search;
        search = search.slice(1);
        var searchArr = search.split("&");
        var searchObj = {};
        for (var i = 0; i < searchArr.length; i++) {
            var key = searchArr[i].split("=")[0];
            var value = decodeURI(searchArr[i].split("=")[1]);
            //把属性名和值存储到对象中
            searchObj[key] = value;
        }
        return searchObj;
    }
    getParam(key){
        return this.getParamObj()[key];
    }
    checkLogin(data){
        if(data.error == 400) {
            location.href = "login.html?hrefAddr="+location.href;
        }
    }
}
var t = new Tool();

