var remoteGame = function (socket) {
    var game;
    var currL;
    var nextL;
    var doms = {
        gameDiv: document.getElementById('remoteGame'),
        nextDiv: document.getElementById('remoteNext'),
        gameTimeDiv: document.getElementById('remoteTime'),
        gameScoreDiv: document.getElementById('remoteScore'),
    };

    // 绑定按钮事件
    var bindEvents = function (socket) {
        socket.on('start', function (data) {
            game = new Game();

        })
        socket.on('init', function (data) {
            currL = new Square(data.type, data.dir);
            console.log('init'+ ':' + data.type, data.dir);
            console.log('currL'+ ':' + currL.origin.squareNum, currL.origin.dir);

        })
        socket.on('curr', function (data) {
            currL = [];
            currL = new Square(data.type, data.dir);
            console.log('curr'+ ':' +data.type, data.dir);
        })
        socket.on('next', function (data) {
            nextL = new Square(data.type, data.dir);
            game.init(doms, currL, nextL);
            console.log('next'+ ':' +data.type, data.dir);
        })
        socket.on('left', function (data) {
            game.left();
            // console.log(data);
        })
        socket.on('right', function (data) {
            game.right();
            // console.log(data);
        })
        socket.on('down', function (data) {
            game.down();
            // console.log(data);
        })
        socket.on('fastDown', function (data) {
            game.fastDown();
            // console.log(data);
        })
        socket.on('rotate', function (data) {
            game.rotate();
            // console.log(data);
        })
        socket.on('addLineData', function (data) {
            game.randomCreateline(data.length, data);
            console.log('remote call data',data);
        })
        socket.on('removeY', function (data) {
            game.removeY();
            console.log(data);
        })
        socket.on('upTimeSocre', function (data) {
            game.upTimeSocre(doms.gameTimeDiv, data.gameTime);
            game.upTimeSocre(doms.gameScoreDiv, data.gameScore);
            // console.log(data);
        })
        socket.on('lose', function (data) {
            document.getElementsByClassName('localLose').innerHTML = '你赢了'
            document.getElementsByClassName('remoteLose').innerHTML = '你输了'
        })
    }

    bindEvents(socket);
}
