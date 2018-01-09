var app = require('http').createServer();
var io = require('socket.io')(app);

var PORT = 3000;

// 客户端计数
var clientCount = 0;

//  用来存储客户端socket
var socketMap = {};

app.listen(PORT);

var bindSocketEvent = function (type, socket) {
    socket.on(type, function (data) {
        // 发送 接受到 初始化信息 发送给对方
        if(socket.clientNum  === 2) {
            socketMap[socket.clientNum - 1].emit(type, data);
            console.log(data);
        } else {
            socketMap[socket.clientNum + 1 ].emit(type, data);
        }

    })
}

io.on('connection', function (socket) {

    clientCount = clientCount + 1;
    if(clientCount > 2) {
        clientCount = 2;
    }
    socket.clientNum = clientCount;
    socketMap[clientCount] = socket;

    console.log(clientCount);

    if(clientCount  !== 2) {
        socket.emit('waiting', '等待其他玩家连接');

    } else {
        socketMap[(clientCount - 1)].emit('start', '开始战斗');
        socketMap[(clientCount)].emit('start', '开始战斗');
        // clientCount = 0;
    }

    bindSocketEvent('init', socket);
    bindSocketEvent('curr', socket);
    bindSocketEvent('next', socket);
    bindSocketEvent('rotate', socket);
    bindSocketEvent('down', socket);
    bindSocketEvent('fastDown', socket);
    bindSocketEvent('left', socket);
    bindSocketEvent('right', socket);
    bindSocketEvent('removeY', socket);
    bindSocketEvent('gameOver', socket);
    bindSocketEvent('setData', socket);
    bindSocketEvent('refresh', socket);
    bindSocketEvent('upTimeSocre', socket);
    bindSocketEvent('randomCreateLine', socket);


    socket.on('disconnect', function () {
        clientCount--;
        if(clientCount < 0) {
            clientCount = 0;
        }
    })
})