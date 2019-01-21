/**
 * 传入Json数组，构建JsonArray对象
 * @param {Array} a 
 */
function JsonArray(a) {
    this.srcArr = a;
    this.arr = a;
}

JsonArray.prototype.sort = JsonArray.prototype.sort ||
    /**
     * 对JSON数组按指定键的值进行排序
     * @param {string} keyName 
     * @param {boolean} desc 是否降序排列   默认false——采用升序排序
     * @return {number}
     */
    function(keyName, desc) {
        function _sort(a, b) {
            if ('number' === typeof a[keyName]) {
                return (!desc) ? a[keyName] - b[keyName] : b[keyName] - a[keyName];
            } else if ('string' === typeof a[keyName]) {
                var t = a[keyName].localeCompare(b[keyName]);
                return (!desc) ? t : (0 - t);
            } else
                return -1;
        }
        return this.arr.sort(_sort);
    }

JsonArray.prototype.group = JsonArray.prototype.group ||
    /**
     * 以键名【keyName】字段对JSON数组进行分组（&排序）
     * @param {string} keyName 
     * @param {JSON} options 
     */
    function(keyName, options) {
        var result = [],
            keyValues = []; //键keyName对应的值的集合，不含重复值
        for (var i = 0; i < this.arr.length; i++) {
            var data = this.arr[i];
            if (keyValues.indexOf(data[keyName]) < 0) keyValues.push(data[keyName]);
            else continue;
            var res = {
                keyValue: data[keyName],
                data: []
            };
            for (var j = i; j < this.arr.length; j++) {
                data = this.arr[j];
                if (keyValues[keyValues.length - 1] === data[keyName])
                    res.data.push(data);
            }
            result.push(res);
        }
        return result;
    }

JsonArray.fn = JsonArray.fn ||
    /**
     * 静态函数
     */
    function() {

    }
var JA = function(arr) {
    return new JsonArray(arr);
}

exports = module.exports = JsonArray;