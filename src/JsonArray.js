/**
 * 传入Json数组，构建JsonArray对象
 * @param {Array} a 
 */
function JsonArray(a) {
    this.arr = a;
}

JsonArray.prototype.sort = function() {

}

JsonArray.prototype.group = function() {

}

var JA = function(arr) {
    return new JsonArray(arr);
}
exports = module.exports = JA;