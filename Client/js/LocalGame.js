var localGame = function (socket) {
    var game;
    var doms = {
        gameDiv: document.getElementById('localGame'),
        nextDiv: document.getElementById('localNext'),
        gameTimeDiv: document.getElementById('localTime'),
        gameScoreDiv: document.getElementById('localScore')
    }
    var start = function () {
        var curr = new Square();
        var next = new Square();
        game = new Game(socket);
        game.init(doms, curr, next);
        game.keyEvent();
        game.autoMove();

        // 发送 方块信息
        socket.emit('init', {type: curr.origin.squareNum, dir: curr.origin.dir});
        socket.emit('next', {type: next.origin.squareNum, dir: next.origin.dir});
    }

    socket.on('start', function () {
        start(); // 收到 start 开始游戏
    })

    this.start = start;
}

