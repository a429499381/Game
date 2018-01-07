var localGame = function (socket) {
    var game;
    var doms = {
        gameDiv: document.getElementById('localGame'),
        nextDiv: document.getElementById('localNext'),
        gameTimeDiv: document.getElementById('localTime'),
        gameScoreDiv: document.getElementById('localScore')
    }
    var start = function () {
        var curr = new Square(0, 0);
        var next = new Square(0, 1);
        game = new Game(socket);
        game.init(doms, curr, next);
        game.keyEvent();
        game.autoMove();

        // 发送 方块信息
        console.log('发送的信息curr'+ curr.origin.squareNum + curr.origin.dir);
        console.log('发送的信息next'+ next.origin.squareNum + next.origin.dir);

        socket.emit('init', {type: curr.origin.squareNum, dir: curr.origin.dir});
        socket.emit('next', {type: next.origin.squareNum, dir: next.origin.dir});
        socket.on('lose', function () {
           game.gameOver(true);
        });
    }

    socket.on('start', function () {
        start(); // 收到 start 开始游戏
    })

    this.start = start;
}

