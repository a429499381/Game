var Game = function (doms, socket) {
    var gameDiv = doms.gameDiv;
    var nextDiv = doms.nextDiv;
    var gameTimeDiv = doms.gameTimeDiv;
    var gameScoreDiv = doms.gameScoreDiv;
    var gameDivs = [];
    var nextDivs = [];
    var curr;
    var next;
    var SOCKET;
    SOCKET = socket;
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
    var TIME = 500;
// 记时
    var gameTime = 0;
// 记分
    var gameScore = 0;

// 初始数据模版
    var initData = function (datas, dataDivs, domDiv) {
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


// 记分 记时 方法
    var upTimeSocre = function (div, time) {
        div.innerHTML = time;
    }


// 设置数据
    var setData = function (currObj, datas) {
        for (var x = 0; x < currObj.data.length; x++) {
            for (var y = 0; y < currObj.data[0].length; y++) {
                if (currObj.data[x][y] !== 0) {
                    // 如果 该位置 为 0 才能设置
                    if (datas[currObj.origin.x + x][currObj.origin.y + y] === 0) {
                        datas[currObj.origin.x + x][currObj.origin.y + y] = currObj.data[x][y];
                    }
                }
            }
        }
    };

// 清楚数据
    var clearData = function (curr) {
        for (var i = 0; i < curr.data.length; i++) {
            for (var j = 0; j < curr.data[i].length; j++) {
                if (curr.data[i][j] !== 0) {
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
    var keyEvent = function () {
        document.onkeydown = function (e) {
            if (e.keyCode === 38) { // up rotate
                rotate();
                socket.emit('rotate', 'rotate');
            } else if (e.keyCode === 40) { // down
                down(curr);
                socket.emit('down', 'down');
            } else if (e.keyCode === 37) { // left
                left();
                socket.emit('left', 'down');
            } else if (e.keyCode === 39) { // right
                right();
                socket.emit('right', 'right');
            } else if (e.keyCode === 32) { //  space  下坠
                fastDown();
            }
        }
    };

// 旋转
    var rotate = function () {
        // 测试下一步 临时原点
        var Origin = function () {
            this.origin = {
                x: curr.origin.x,
                y: curr.origin.y,
                dir: curr.origin.dir + 1 === 4 ? 0 : curr.origin.dir + 1,
                squareNum: curr.origin.squareNum
            }
        }
        var origin = new Origin();
        if (checkData(curr, curr.getSquare(origin.origin.dir))) {
            clearData(curr);
            curr.rotate();
            setData(curr, gameData);
            refresh(gameData, gameDivs);
            clearData(curr);
            return true;
        }
    }

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

        if (checkData(origin, curr.data)) {
            clearData(curr);
            curr.down()
            setData(curr, gameData);
            refresh(gameData, gameDivs);
            return true;
        } else {
            fixed();
            socket.emit('fixed', 'fixed');
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
                y: curr.origin.y - 1
            }
        }
        var origin = new Origin();
        if (checkData(origin, curr.data)) {
            clearData(curr);
            curr.left()
            setData(curr, gameData);
            refresh(gameData, gameDivs);
            return true;
        } else {
            return false;
        }
    }

// 右
    var right = function () {
        var Origin = function () {
            this.origin = {
                x: curr.origin.x,
                y: curr.origin.y + 1
            }
        }
        var origin = new Origin();
        if (checkData(origin, curr.data)) {
            clearData(curr);
            curr.right()
            setData(curr, gameData);
            refresh(gameData, gameDivs);
            return true;
        } else {
            return false;
        }
    }


// 固定方块
    var fixed = function () {
        for (var i = gameData.length - 1; i >= 0; i--) {
            for (var j = 0; j < gameData[0].length; j++) {
                if (gameData[i][j] === 1) {
                    gameData[i][j] = 2;
                }
            }

        }
    }

// game over
    var gameOver = function () {
        for (var y = 0; y < gameData[0].length; y++) {
            if (gameData[0][y] === 2) {
                clearInterval(time);
                console.log('游戏失败, 再接再厉');
                return false;
            }
        }
        return true;
    }


// 消行
    var removeY = function () {
        var lock = true;
        var nullN = null;
        var nullLock = true;
        for (var x = (gameData.length - 1); x >= 0; x--) {
            lock = true;
            // 检测最高一层的空行
            for (var v = gameData.length - 1; v >= 0; v--) {
                var temp = 0;
                for (var n = 0; n < gameData[0].length; n++) {
                    if (gameData[v][n] !== 0) {
                        break;
                    } else {
                        temp++;
                        if (temp === 10 && nullLock) {
                            nullLock = false;
                            nullN = v;
                        }

                    }
                }
            }


            // 不是 要 消除的行 关闭锁
            for (var y = 0; y < gameData[0].length; y++) {
                if (gameData[x][y] !== 2) {
                    lock = false;
                    break;
                }
            }


            if (lock) { // 锁开启状态 消除行  下移行
                gameScore += 10;
                upTimeSocre(gameScoreDiv, gameScore);

                // 发送比分
                socket.emit('upSocre', gameScore);

                if (gameScore % 20 === 0) {
                    randomCreateline(1); // 增加指定行

                    // 发送增加行
                    socket.emit('randomCreateLine', 1);
                }
                for (var i = x; i > nullN; i--) {
                    for (var i1 = 0; i1 < gameData[0].length; i1++) {
                        gameData[i][i1] = gameData[i - 1][i1];
                    }
                }
                // 此行 无法理解！！！！
                // for (var i1 = 0; i1< gameData[0].length; i1++) {
                //     console.log(gameData[0][i1]);
                //     gameData[0][i1] = 0;
                // }
                x++;
            }
        }
    }

// 指定增加N行随机方块
    var randomCreateline = function (lines) {
        // 所有不为0的数据全部上移一行
        for (var line = 1; line < gameData.length; line++) {
            for (var s = 0; s < gameData[0].length; s++) {
                // 空行检测
                if (gameData[line][s] !== 0) {
                    if (line + lines > gameData.length) {
                        gameOver(); // 游戏结束

                    } else {
                        gameData[line - lines][s] = gameData[line][s];
                        gameData[line][s] = 0;

                    }
                }
            }
        }


        // 将产生的新数据写入底部行
        for (var l = 0; l < lines; l++) {
            for (var y = 0; y < gameData[0].length; y++) {
                gameData[gameData.length - 1][y] = Math.ceil(Math.random() * 2) - 1 === 1 ? 2 : 0;

            }
        }

    }

// 自动下移动
    var autoMove = function (doms) {
        var n = 0;
        var move = function () {
            n++; // 记时统计
            if (n === 2) {
                n = 0;
                gameTime++;
                upTimeSocre(gameTimeDiv, gameTime);

                // 发送时间
                socket.emit('upTime', gameTime);
            }

            if (down()) {
                down();
                // 发送下移命令
                socket.emit('down', 'down');

            } else {
                removeY();
                gameOver();
                curr = next;
                next = new Square();
                setData(curr, gameData);
                refresh(gameData, gameDivs);
                refresh(next.data, nextDivs);

                // 发送消行，游戏结束检查。。
                socket.emit('removeY', 'removeY');
                socket.emit('gameOver', 'gameOver');
                socket.emit('init', {type: curr.origin.squareNum, dir: curr.origin.dir});
                socket.emit('next', {type: next.origin.squareNum, dir: next.origin.dir});
            }
        }

        time ? clearInterval(time) : '';
        time = setInterval(move, TIME);
    }

    // 初始化
    var localInit = function () {
        // 当前方块
        curr = new Square();
        // 下一步方块
        next = new Square();

        // 发送 方块类型  方向
        socket.emit('init', {type: curr.origin.squareNum, dir: curr.origin.dir});
        socket.emit('next', {type: next.origin.squareNum, dir: next.origin.dir});

        initData(gameData, gameDivs, gameDiv);
        initData(nextData, nextDivs, nextDiv);
        setData(curr, gameData);
        setData(next, nextData);
        refresh(gameData, gameDivs);
        refresh(next.data, nextDivs);
    }

    var remoteInit = function (type, dir) {

    }

    this.curr = curr;
    this.next = next;
    this.keyEvent = keyEvent;
    this.initData = initData;
    this.upTimeSocre = upTimeSocre;
    this.localInit = localInit;
    this.remoteInit = remoteInit;
    this.setData = setData;
    this.clearData = clearData;
    this.refresh = refresh;
    this.checkData = checkData;
    this.checkBorder = checkBorder;
    this.rotate = rotate;
    this.down = down;
    this.fastDown = fastDown;
    this.left = left;
    this.right = right;
    this.fixed = fixed;
    this.gameOver = gameOver;
    this.removeY = removeY;
    this.randomCreateline = randomCreateline;
    this.autoMove = autoMove;

}