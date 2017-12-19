// 初始数据模版
var initData = function (gameId) {
    // 游戏主体数据模版 10*20
    var gameData = [

        [0,0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0,0],
    ];
    // 下一步数据模版 4*4
    var nextData = [
        [0,0,0,0],
        [0,0,0,0],
        [0,0,0,0]
    ];

    // 传递进来的游戏主体 div
    var gameDiv = document.getElementById(gameId);
    // 准备要插入的 小方块 20*20
    var square = document.createElement('div');
    square.className = 'none';
    square.style.width = 20 + 'px';
    square.style.height = 20 + 'px';
    square.style.backgroundColor = 'red';
    square.position = 'absolute';
    var gameDivs = [];
    var nextDivs = [];

    for(var i = 0; i < gameData.length; i++) {
        for(var j = 0; j < gameData[i].length; j++) {
                // 在主体游戏框架中填充 20*20 的 默认色方块 （白色）
                square.style.top = i * 20 + 'px';
                square.style.left = j * 20 + 'px';
                gameDiv.appendChild(square);
        }
    }

    console.log('插入完毕'  )
}

initData('game');