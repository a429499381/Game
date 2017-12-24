// 传递进来的游戏主体 div
var gameDiv = document.getElementById('game');
var nextDiv = document.getElementById('next');
var gameDivs = [];
var nextDivs = [];

// 定时器
var time = null;

var currSquareXY = [];
// 方块起始点
var origin = {
    x: 0,
    y: 4
};

// 游戏主体数据模版 10*20
var gameData = [
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
];

// 下一步数据模版 4*4
var nextData = [
    [0, 0, 0, 0],
    [0, 0, 0, 0],
    [0, 0, 0, 0],
    [0, 0, 0, 0]
];

// 初始数据模版
var initData = function () {

    var squareData = function (datas, dataDivs, domDiv) {
        for (var i = 0; i < datas.length; i++) {
            var data = []
            for (var j = 0; j < datas[0].length; j++) {
                // 在主体游戏框架中填充 20*20 的 默认色方块（白色）
                var square = document.createElement('div');
                square.className = 'none';
                square.style.width = 20 + 'px';
                square.style.height = 20 + 'px';
                square.style.position = 'absolute';
                square.style.top = (i * 20) + 'px';
                square.style.left = (j * 20) + 'px';
                domDiv.appendChild(square);
                data.push(square);
            }
            dataDivs.push(data);
        }
    };
    squareData(gameData, gameDivs, gameDiv);
    squareData(nextData, nextDivs, nextDiv);
}

// 五种方块模版
var squareRandom = function () {
    // 获取随机 方向 方块形状
    var dirNum = Math.ceil(Math.random() * 4) - 1;
    var squareNum = Math.ceil(Math.random() * 5) - 1;

    // 方块 数据模版
    var squareData0 = [
        [
            [1, 1, 1, 1],
            [0, 0, 0, 0],
            [0, 0, 0, 0],
            [0, 0, 0, 0]
        ],
        [
            [1, 0, 0, 0],
            [1, 0, 0, 0],
            [1, 0, 0, 0],
            [1, 0, 0, 0]
        ],
        [
            [1, 1, 1, 1],
            [0, 0, 0, 0],
            [0, 0, 0, 0],
            [0, 0, 0, 0]
        ],
        [
            [1, 0, 0, 0],
            [1, 0, 0, 0],
            [1, 0, 0, 0],
            [1, 0, 0, 0]
        ]
    ]; // 1
    var squareData1 = [ // 7
        [
            [1, 1, 0, 0],
            [0, 1, 0, 0],
            [0, 1, 0, 0],
            [0, 0, 0, 0]
        ],
        [
            [1, 1, 0, 0],
            [1, 0, 0, 0],
            [1, 0, 0, 0],
            [0, 0, 0, 0]
        ],
        [
            [1, 0, 0, 0],
            [1, 1, 1, 0],
            [0, 0, 0, 0],
            [0, 0, 0, 0]
        ],
        [
            [0, 1, 0, 0],
            [0, 1, 0, 0],
            [1, 1, 0, 0],
            [0, 0, 0, 0]
        ]
    ]; // 7
    var squareData2 = [
        [
            [1, 1, 0, 0],
            [1, 1, 0, 0],
            [0, 0, 0, 0],
            [0, 0, 0, 0]
        ],
        [
            [1, 1, 0, 0],
            [1, 1, 0, 0],
            [0, 0, 0, 0],
            [0, 0, 0, 0]
        ],
        [
            [1, 1, 0, 0],
            [1, 1, 0, 0],
            [0, 0, 0, 0],
            [0, 0, 0, 0]
        ],
        [
            [1, 1, 0, 0],
            [1, 1, 0, 0],
            [0, 0, 0, 0],
            [0, 0, 0, 0]
        ]
    ]; // 田
    var squareData3 = [
        [
            [0, 1, 0, 0],
            [1, 1, 0, 0],
            [0, 1, 0, 0],
            [0, 0, 0, 0]
        ],
        [
            [1, 0, 0, 0],
            [1, 1, 0, 0],
            [1, 0, 0, 0],
            [0, 0, 0, 0]
        ],
        [
            [0, 1, 0, 0],
            [1, 1, 1, 0],
            [0, 0, 0, 0],
            [0, 0, 0, 0]
        ],
        [
            [1, 1, 1, 0],
            [0, 1, 0, 0],
            [0, 0, 0, 0],
            [0, 0, 0, 0]
        ]
    ]; // 上
    var squareData4 = [
        [
            [1, 0, 0, 0],
            [1, 1, 0, 0],
            [0, 1, 0, 0],
            [0, 0, 0, 0]
        ],
        [
            [0, 1, 0, 0],
            [1, 1, 0, 0],
            [1, 0, 0, 0],
            [0, 0, 0, 0]
        ],
        [
            [1, 1, 0, 0],
            [0, 1, 1, 0],
            [0, 0, 0, 0],
            [0, 0, 0, 0]
        ],
        [
            [0, 1, 1, 0],
            [1, 1, 0, 0],
            [0, 0, 0, 0],
            [0, 0, 0, 0]
        ]
    ]; // z

    var backSquare = function () {
        if (squareNum === 0) {
            return squareData0[dirNum];
        } else if (squareNum === 1) {
            return squareData1[dirNum]
        } else if (squareNum === 2) {
            return squareData2[dirNum]
        } else if (squareNum === 3) {
            return squareData3[dirNum]
        } else if (squareNum === 4) {
            return squareData4[dirNum]
        }
        return false;
    };
    var square = backSquare();
    return square;
};

// 当前方块
var currSquare = squareRandom();

// 下一步方块
var nextSquare = squareRandom();

// 设置数据
var setData = function () {
    for (var x = 0; x < nextData.length; x++) {
        for (var y = 0; y < nextData[0].length; y++) {
            if (currSquare[x][y] !== 0) {
                gameData[origin.x + x][origin.y + y] = currSquare[x][y];
                currSquareXY.push([origin.x + x, origin.y + y]);
            }
        }
    }
};

// 清楚数据
var clearData = function () {
    console.log(currSquareXY);
    for (var i = 0; i < currSquareXY.length; i++) {
        gameData[currSquareXY[i][0]][currSquareXY[i][1]] = 0;
    }
    currSquareXY = [];
};

// 刷新
var refresh = function (datas, DomDivs) {
    for (var x = 0; x < datas.length; x++) {
        for (var y = 0; y < datas[0].length; y++) {
            if (datas[x][y] === 1) {
                DomDivs[x][y].className = 'done';
            } else if (datas[x][y] === 2) {
                DomDivs[x][y].className = 'current';
            } else if (datas[x][y] === 0) {
                DomDivs[x][y].className = 'none';
            }
        }
    }
};

// 边界检查
var checkBorder = function (dir) {
    for (var i = 0; i < currSquareXY.length; i++) {

        for (var j = 0; j < currSquareXY[i].length; j++) {
            if (currSquareXY[i][j + 1] <= 0 && dir === 'left') {
                return false;
            }
            if (currSquareXY[i][j + 1] >= gameData[0].length - 1 && dir === 'right') {
                return false;
            }
        }
        if (currSquareXY[3][0] >= gameData.length - 1 && dir === 'down') {
            return false;
        }
    }
    return true;
}

// 本次 结束
var currOver = function () {
    for(var i = 0; i < gameData.length; i++) {
        for(var j = 0; j < gameData[0].length; j++) {
            if(gameData[i][j] !== 0) {
                gameData[i][j] = 2;
            }
        }
    }
    currSquare = nextSquare;
    nextSquare = squareRandom();
    setData();
    refresh(gameData, gameDivs);
    refresh(nextSquare, nextDivs);
}

// 键盘控制
var keyEvent = (function () {
    document.onkeydown = function (e) {
        if (e.keyCode === 38) { // up rotate

        } else if (e.keyCode === 40) { // down
            down();
        } else if (e.keyCode === 37) { // left
            left();
        } else if (e.keyCode === 39) { // right
            right();
        } else if (e.keyCode === 32) { //  space  下坠
            fastDown();
        }
    }
})();

// 方向控制
var down = function () {
    if (checkBorder('down')) {
        clearData();
        origin.x = origin.x + 1;
        setData();
        refresh(gameData, gameDivs);
        currOver();
    }
}
var left = function () {
    if (checkBorder('left')) {
        clearData();
        origin.y = origin.y - 1;
        setData();
        refresh(gameData, gameDivs);
    }
}
var right = function () {
    if (checkBorder('right')) {
        clearData();
        origin.y = origin.y + 1;
        setData();
        refresh(gameData, gameDivs);
    }
}

var fastDown = function () {
    while (checkBorder('down')) {
        down();
    }

}


initData();
setData();
refresh(gameData, gameDivs);
refresh(nextSquare, nextDivs);