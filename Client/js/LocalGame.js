var localGame = function (socket) {
    var game;
    var doms = {
        gameDiv: document.getElementById('localGame'),
        nextDiv: document.getElementById('localNext'),
        gameTimeDiv: document.getElementById('localTime'),
        gameScoreDiv: document.getElementById('localScore')
    }
    var start = function () {
        game = new Game(doms, socket);
        game.localInit();
        game.keyEvent();
        game.autoMove();
    }

    socket.on('start', function () {
        start(); // 收到 start 开始游戏
    })

    this.start = start;
}

