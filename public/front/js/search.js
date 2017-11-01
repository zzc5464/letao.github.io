/**
 * Created by zzc on 2017/11/1.
 */
//function getParam(){
//    var param = location.search.slice(1);
//    //?id=1&name=zs
//    var arr = param.split("&");
//    var newObj = {};
//    for(var i=0;i<arr.length;i++ ) {
//        var key = arr[i].split("=")[0];
//        var val = decodeURI(arr[i].split("=")[1]);
//        newObj[key] = val;
//    }
//    return newObj;
//}
//var r = getParamName("out");
//
//function getParamName(key){
//    return getParam()[key]
//}

class Tool{
    constructor(){
        console.log(this.getParam());
    }
    getParam(){
        var param = location.search.slice(1);
        //?id=1&name=zs
        var arr = param.split("&");
        var newObj = {};
        for(var i=0;i<arr.length;i++ ) {
            var key = arr[i].split("=")[0];
            var val = decodeURI(arr[i].split("=")[1]);
            newObj[key] = val;
        }
        return newObj;
    }
    getParamName(key){
        return this.getParam()[key]
    }
}
var t = new Tool()
console.log(t.getParam());
console.log(t.getParamName("out"));