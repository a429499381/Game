var remoteGame = function (socket) {
    var game;

    // 绑定按钮事件
    var bindEvents = function (socket) {
        socket.on('start', function (data) {
           start();

        })
        socket.on('init', function (data) {
           new Square(data.type, data.dir);
            console.log('init'+ ':' + data.type, data.dir);

        })
        socket.on('next', function (data) {
            new Square(data.type, data.dir);
            console.log('next'+ ':' +data.type, data.dir);
        })
        socket.on('left', function (data) {
            console.log(data);
        })
        socket.on('right', function (data) {
            console.log(data);
        })
        socket.on('down', function (data) {
            console.log(data);
        })
        socket.on('rotate', function (data) {
            console.log(data);
        })
        socket.on('randomCreateLine', function (data) {
            console.log(data);
        })
        socket.on('removeY', function (data) {
            console.log(data);
        })
        socket.on('upTime', function (data) {
            console.log(data);
        })
        socket.on('upSocre', function (data) {
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
    }

    bindEvents(socket);
}
