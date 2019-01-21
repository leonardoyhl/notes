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
     * @param {string} key 
     * @param {boolean} desc 是否降序排列   默认false——采用升序排序
     * @return {number}
     */
    function(key, desc) {
        function _sort(a, b) {
            if ('number' === typeof a[key]) {
                return (!desc) ? a[key] - b[key] : b[key] - a[key];
            } else if ('string' === typeof a[key]) {
                var t = a[key].localeCompare(b[key]);
                return (!desc) ? t : (0 - t);
            } else
                return -1;
        }
        return this.arr.sort(_sort);
    }

JsonArray.prototype.group = function() {

}

var JA = function(arr) {
    return new JsonArray(arr);
}
exports = module.exports = JA;