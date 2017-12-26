// 传递进来的游戏主体 div
var gameDiv = document.getElementById('game');
var nextDiv = document.getElementById('next');
var gameDivs = [];
var nextDivs = [];

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
var nextData = [
    [0,0,0,0],
    [0,0,0,0],
    [0,0,0,0],
    [0,0,0,0]
];

// 定时器
var time = null;

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


// 当前方块
var curr = Square();
var currSquare = curr.getSquare();

// 下一步方块
var next = Square();
nextData = next.getSquare();

// 设置数据
var setData = function (currObj) {
    for (var x = 0; x < currSquare.length; x++) {
        for (var y = 0; y < currSquare[0].length; y++) {
            if (currSquare[x][y] !== 0) {
                // 如果 该位置 为 0 才能设置
                if(gameData[curr.origin.x + x][curr.origin.y + y] === 0) {
                    gameData[curr.origin.x + x][curr.origin.y + y] = currSquare[x][y];
                }

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
            if(gameData[i][j] === 1) {
                gameData[i][j] = 2;
            }
        }
    }
    currSquareXY = [];
    currSquare = nextSquare;
    nextSquare = squareRandom();
    origin.x = 0; origin.y = 4;
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



initData();
setData(currSquare);
refresh(gameData, gameDivs);
refresh(nextSquare, nextDivs);