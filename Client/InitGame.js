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
    [0, 0, 0, 0],
    [0, 0, 0, 0],
    [0, 0, 0, 0],
    [0, 0, 0, 0]
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
var curr = new Square();
var currData = curr.getSquare();

// 下一步方块
var next = new Square();
nextData = next.getSquare();

// 设置数据
var setData = function (currObj, datas) {
    var square = currObj.getSquare();
    for (var x = 0; x < square.length; x++) {
        for (var y = 0; y < square[0].length; y++) {
            if (square[x][y] !== 0) {
                // 如果 该位置 为 0 才能设置
                if (datas[curr.origin.x + x][curr.origin.y + y] === 0) {
                    datas[curr.origin.x + x][curr.origin.y + y] = square[x][y];
                }

            }
        }
    }
};

// 清楚数据
var clearData = function () {
    for (var i = 0; i < currData.length; i++) {
        for (var j = 0; j < currData[i].length; j++) {
            if (currData[i][j] !== 0) {
                gameData[curr.origin.x + i][curr.origin.y + j] = 0;
            }
        }
    }
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


// 数据检查
var checkData = function (curr, currData) {
    for (var i = 0; i < currData.length; i++) {
        for (var j = 0; j < currData[i].length; j++) {
            if (currData[i][j] !== 0) {
                if (!checkBorder(curr, i, j)) {
                    return false;
                }
            }
        }
    }
    return true;
}

// 原点 检查
var checkBorder = function (currObj, x, y) {
    if (currObj.origin.x + x < 0) {
        return false;
    } else if (currObj.origin.x + x >= gameData.length) {
        return false;
    } else if (currObj.origin.y + y < 0) {
        return false;
    } else if (currObj.origin.y + y >= gameData[0].length) {
        return false;
    } else if (gameData[currObj.origin.x + x][currObj.origin.y + y] === 2) {
        return false; // 如果这个坐标是个 2
    } else {
        return true;

    }
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

// 下
var down = function () {
    // 测试下一步 临时原点
    var Origin = function () {
        this.origin = {
            x: curr.origin.x + 1,
            y: curr.origin.y
        }
    }
    var origin = new Origin();
    if (checkData(origin, currData)) {
        clearData();
        curr.down()
        setData(curr, gameData);
        refresh(gameData, gameDivs);
        return true;
    } else {
        return false;
    }
}

// 下坠
var fastDown = function () {
    while (down()) {
        down();
    }
}

// 左
var left = function () {
    var Origin = function () {
        this.origin = {
            x: curr.origin.x,
            y: curr.origin.y -1
        }
    }
    var origin = new Origin();
    if (checkData(origin, currData)) {
        clearData();
        curr.left();
        setData(curr, gameData);
        refresh(gameData, gameDivs);
    }
}


// 左
var right = function () {
    var Origin = function () {
        this.origin = {
            x: curr.origin.x,
            y: curr.origin.y + 1
        }
    }
    var origin = new Origin();
    if (checkData(origin, currData)) {
        clearData();
        curr.right();
        setData(curr, gameData);
        refresh(gameData, gameDivs);
    }
}



initData();
setData(curr, gameData);
setData(next, nextData);
refresh(gameData, gameDivs);
refresh(nextData, nextDivs);