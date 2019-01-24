//更好方案：https://blog.csdn.net/qq_42606051/article/details/82385044
function Runtime(){}
Runtime.log=function(fn,...args){
    if('function' === typeof fn){
        var bt=new Date().getTime();
        fn.call(this,...args);
        var et=new Date().getTime();
        var rt=et-bt;
        console.log('['+ fn.name+'] Finished in '+rt+'ms by c');
    }else{
        console.warn('Not a function: '+fn);
    }
}
function logRuntime(fn,...args){
    if('function' === typeof fn){
        var bt=new Date().getTime();
        fn.call(this,...args);
        var et=new Date().getTime();
        var rt=et-bt;
        console.log('['+ fn.name+'] Finished in '+rt+'ms by e');
    }else{
        console.warn('Not a function: '+fn);
    }
}

exports.Runtime=module.exports.Runtime=Runtime;
exports.logRuntime=module.exports.logRuntime=logRuntime;
