Array.prototype.sortJSON=Array.prototype.sortJSON ||
/**
 * 对JSON数组按指定键的值排序
 * @param {string} key 
 * @param {boolean} desc 是否降序，默认false升序 Descending ascending
 */
function(key,desc){
    function _s(a,b){
        if('number'===typeof a[key])
            return (!desc) ? a[key]-b[key] : b[key]-a[key];//支持数字字符串
        else if('string'===typeof a[key])
            return (!desc) ? a[key].localeCompare(b[key]) : b[key].localeCompare(a[key]);
        else return false;
    }
    return this.sort(_s);
}

Array.prototype.groupJSON=Array.prototype.groupJSON ||
/**
 * 以 field 字段对JSON数组进行分组
 * @param {string} field 
 * @param {JSON} sortOptions 排序配置，过滤字段
 */
function (field,sortOptions){
    var jsonArr=this.valueOf();
    var result=[];
    var keyValues=[];//键field对应的值的集合，不含重复值
    for(var i=0;i<jsonArr.length;i++){
        var data=jsonArr[i];
        if(keyValues.indexOf(data[field])<0)
            keyValues.push(data[field]);
        else continue;
        var res={
            fieldValue:data[field],
            data:[]
        };
        for(var j=i;j<jsonArr.length;j++){
            data=jsonArr[j];
            if(keyValues[keyValues.length-1]===data[field]){
                res.data.push(data);
            }
        }
        result.push(res);
    }
    return result;
}
