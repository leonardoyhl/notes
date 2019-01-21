var JA = require('../src/JsonArray');

var arr = [
    { id: 15 },
    { id: 4 },
    { id: 6 },
    { id: 7 }
];
var JsonArray = JA(arr);
var t = JsonArray.sort('id');
console.log(arr);
console.log(JsonArray.srcArr);
console.log(t);