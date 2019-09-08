//算法思想参考：https://blog.csdn.net/shenhonglei1234/article/details/53102853
//17位VIN码含义：https://zhidao.baidu.com/question/1733373115798704387.html
const VINValues = {
        0: 0,
        1: 1,
        2: 2,
        3: 3,
        4: 4,
        5: 5,
        6: 6,
        7: 7,
        8: 8,
        9: 9,
        A: 1,
        B: 2,
        C: 3,
        D: 4,
        E: 5,
        F: 6,
        G: 7,
        H: 8,
        J: 1,
        K: 2,
        L: 3,
        M: 4,
        N: 5,
        P: 7,
        R: 9,
        S: 2,
        T: 3,
        U: 4,
        V: 5,
        W: 6,
        X: 7,
        Y: 8,
        Z: 9
    },
    VINWeights = [8, 7, 6, 5, 4, 3, 2, 10, 0, 9, 8, 7, 6, 5, 4, 3, 2],
    years = {
        1: 1,
        2: 2,
        3: 3,
        4: 4,
        5: 5,
        6: 6,
        7: 7,
        8: 8,
        9: 9,
        A: 1,
        B: 2,
        C: 3,
        D: 4,
        E: 5,
        F: 6,
        G: 7,
        H: 8,
        J: 1,
        K: 2,
        L: 3,
        M: 4,
        N: 5,
        P: 7,
        R: 9,
        S: 2,
        T: 3,
        V: 5,
        W: 6,
        X: 7,
        Y: 8
    };

function createRandom(dividend) {
    return Math.floor(Math.random() * 1000) % dividend;
}

function getCheckCode(vinArr) {
    var sum = 0;
    for (var i = 0; i < 17; i++) {
        if (i == 8) continue;
        sum += VINValues[vinArr[i]] * VINWeights[i];
    }
    var remainder = sum % 11;
    if (remainder == 10) return 'X';
    else return remainder;
}
// var map = new Map(years);
function generateVin() {
    var vinArr = new Array(17);
    for (var i = 0; i < 17; i++) {
        if (i == 8) continue;
        if (i == 9) {
            vinArr[i] = Object.keys(years)[createRandom(30)];
            continue;
        }
        vinArr[i] = Object.keys(VINValues)[createRandom(33)];
    }
    vinArr[8] = getCheckCode(vinArr);
    return vinArr.join('');
}

//车牌号获取：http://app.16888.com/jx/?mod=more