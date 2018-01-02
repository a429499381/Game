var remoteGame = function (socket) {
    var game;

    // 绑定按钮事件
    var bindEvents = function () {
        socket.on('init', function (data) {
            start(data.type, data.dir);
            console.log(data);
        })
        socket.on('next', function (data) {
            console.log(data);
        })
        socket.on('next', function (data) {
            console.log(data);
        })
        socket.on('next', function (data) {
            console.log(data);
        })
        socket.on('next', function (data) {
            console.log(data);
        })
        socket.on('next', function (data) {
            console.log(data);
        })
        socket.on('next', function (data) {
            console.log(data);
        })
    }

    var doms = {
        gameDiv: document.getElementById('remoteGame'),
        nextDiv: document.getElementById('remoteNext'),
        gameTimeDiv: document.getElementById('remoteTime'),
        gameScoreDiv: document.getElementById('remoteScore')
    }
    var start = function (type, dir) {
        game = new Game(doms);
        game.init(dir, type);
    }

    bindEvents();
}
