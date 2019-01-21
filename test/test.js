var JA = require('../src/JsonArray');

var arr = [
    { id: 15, name: 'sdd' },
    { id: 6, name: 'sdd' },
    { id: 4, name: 'ssddd' },
    { id: 6, name: 'sdd' },
    { id: 7, name: 'srtdd' }
];
var JsonArray = JA(arr);
var t = JsonArray.group('name');
console.log(arr);
console.log(JsonArray.srcArr);
console.log(t);