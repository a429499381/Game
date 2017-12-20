// 初始数据模版
var initData = function (gameId, gameId1) {
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
    // 下一步数据模版 4*4
    var nextData = [
        [0, 0, 0, 0],
        [0, 0, 0, 0],
        [0, 0, 0, 0],
        [0, 0, 0, 0]
    ];

    // 传递进来的游戏主体 div
    var gameDiv = document.getElementById(gameId);
    var nextDiv = document.getElementById(gameId1);
    var gameDivs = [];
    var nextDivs = [];

    var squareData = function (datas, dataDivs, domDiv) {
        for (var i = 0; i < datas.length; i++) {
            var data = []
            for (var j = 0; j < datas[0].length; j++) {
                // 在主体游戏框架中填充 20*20 的 默认色方块（白色）
                var square = document.createElement('div');
                square.className = 'none';
                square.style.width = 20 + 'px';
                square.style.height = 20 + 'px';
                square.style.backgroundColor = '#ff8484';
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

// 七种方块模版
var squareRandom = function () {
    // 获取随机 方向 方块形状
    var dirNum = Math.ceil(Math.random() * 4) - 1;
    var squareNum = Math.ceil(Math.random() * 5) - 1;

    // 方块 数据模版
    var squareData1 = [
        [
            [0, 1, 0, 0],
            [0, 1, 0, 0],
            [0, 1, 0, 0],
            [0, 1, 0, 0]
        ],
        [
            [1, 1, 1, 1],
            [0, 0, 0, 0],
            [0, 0, 0, 0],
            [0, 0, 0, 0]
        ],
        [
            [0, 0, 0, 0],
            [0, 0, 0, 0],
            [0, 0, 0, 0],
            [1, 1, 1, 1]
        ],
        [
            [0, 0, 0, 1],
            [0, 0, 0, 1],
            [0, 0, 0, 1],
            [0, 0, 0, 1]
        ]
    ]; // 1
    var squareData2 = [ // 7
        [
            [1, 1, 1, 0],
            [0, 0, 1, 0],
            [0, 0, 1, 0],
            [0, 0, 1, 0]
        ],
        [
            [0, 0, 0, 0],
            [0, 0, 0, 1],
            [0, 0, 0, 1],
            [1, 1, 1, 1]
        ],
        [
            [0, 0, 0, 0],
            [1, 0, 0, 0],
            [1, 0, 0, 0],
            [1, 1, 1, 1]
        ],
        [
            [1, 1, 1, 1],
            [1, 0, 0, 0],
            [1, 0, 0, 0],
            [0, 0, 0, 0]
        ]
    ]; // 7
    var squareData3 = [
        [
            [0, 0, 0, 0],
            [0, 1, 1, 0],
            [0, 1, 1, 0],
            [0, 0, 0, 0]
        ],
        [
            [0, 0, 0, 0],
            [0, 1, 1, 0],
            [0, 1, 1, 0],
            [0, 0, 0, 0]
        ],
        [
            [0, 0, 0, 0],
            [0, 1, 1, 0],
            [0, 1, 1, 0],
            [0, 0, 0, 0]
        ],
        [
            [0, 0, 0, 0],
            [0, 1, 1, 0],
            [0, 1, 1, 0],
            [0, 0, 0, 0]
        ]
    ]; // 田
    var squareData4 = [
        [
            [0, 1, 0, 0],
            [0, 1, 1, 1],
            [0, 1, 0, 0],
            [1, 1, 1, 1]
        ],
        [
            [1, 1, 1, 1],
            [0, 1, 0, 0],
            [0, 1, 1, 1],
            [0, 1, 0, 0]
        ],
        [
            [1, 0, 0, 0],
            [1, 1, 1, 1],
            [1, 0, 1, 0],
            [1, 0, 1, 0]
        ],
        [
            [0, 0, 0, 1],
            [1, 1, 1, 1],
            [0, 1, 0, 1],
            [0, 1, 0, 1]
        ]

    ]; // 上
    var squareData5 = [
        [
            [0,0,0,0],
            [1,1,0,0],
            [0,1,0,0],
            [0,1,1,1]
        ],
        [
            [0,0,0,1],
            [0,1,1,1],
            [0,1,0,0],
            [0,1,0,0]
        ],
        [
            [0,0,0,1],
            [0,0,0,1],
            [1,1,1,1],
            [1,0,0,0]
        ],
        [
            [1,1,1,0],
            [0,0,1,0],
            [0,0,1,0],
            [0,0,1,1]
        ]

    ]; // z

    var temp = 'squareData' + squareNum;
     console.log(eval(temp[dirNum]));

}

initData('game', 'next');
squareRandom();