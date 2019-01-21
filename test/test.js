var JA = require('../src/JsonArray');

var arr = [
    { id: 15, name: 'sdd' },
    { id: 6, name: 'sdd' },
    { id: 4, name: 'ssddd' },
    { id: 6, name: 'sdd' },
    { id: 7, name: 'srtdd' }
];
var JsonArray = new JA(arr);
var t = JsonArray.group('name'); //分组
console.log(arr);
console.log(t);
JsonArray.sort('id', true);
console.log(JsonArray.srcArr);