var Game = function () {
    // Dom元素
    var gameDiv, nextDiv;

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
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    ];

    // 当前方块
    var curr;
    //下一步方块
    var next;
    // divs
    var gameDivs = [];
    var nextDivs = [];

    // 初始数据模版
    var initData = function (gameId, gameId1) {
        // 传递进来的游戏主体 div
        gameDiv = document.getElementById(gameId);
        nextDiv = document.getElementById(gameId1);

        var squareData = function (datas, dataDivs, domDiv) {
            for (var i = 0; i < datas.length; i++) {
                var data = []
                for (var j = 0; j < datas[0].length; j++) {
                    // 在主体游戏框架中填充 20*20 的 默认色方块（白色）
                    var square = document.createElement('div');
                    square.className = 'none';
                    square.style.width = 20 + 'px';
                    square.style.height = 20 + 'px';
                    // square.style.backgroundColor = '#ff8484';
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
        console.log('插入完毕')
    }

    // 刷新 数据
    var refresh = function (data, dataDivs) {
        for(var i = 0; i < data.length; i++) {
            for(var j = 0; j < data[0].length; j++) {
                if(data[i][j] === 0) {
                    dataDivs[i][j].className = 'none';
                } else if(data[i][j] === 1) {
                    dataDivs[i][j].className = 'done';
                } else if(data[i][j] === 2) {
                    dataDivs[i][j].className = 'current';
                }
            }
        }

        console.log(data.length + '刷新完毕')
    }

    // 初始化
    var init = function (doms) {
        gameDiv = doms.gameDiv;
        nextDiv = doms.nextDiv;
        curr = new Square();
        next = new Square();
        initData('game', 'next');
        refresh(gameData, gameDivs);
        refresh(next.data, nextDivs);
    }

    // 导出API
    this.init = init;

}