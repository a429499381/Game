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
        if(socket.clientNum % 2 === 0) {
            socketMap[socket.clientNum -1].emit(type, data);
        } else {
            socketMap[socket.clientNum + 1].emit(type, data);
        }
        console.log(data);
    })
}

io.on('connection', function (socket) {
    console.log(clientCount);

    clientCount = clientCount + 1;
    socket.clientNum = clientCount;
    socketMap[clientCount] = socket;

    console.log(clientCount);

    if(clientCount % 2 === 1) {
        socket.emit('waiting', '等待其他玩家连接');

    } else {
        // socket.emit('start', '准备开始');
        socketMap[(clientCount - 1)].emit('start', '开始战斗');
        socketMap[(clientCount)].emit('start', '开始战斗');
    }

    bindSocketEvent('init', socket);
    bindSocketEvent('next', socket);
    bindSocketEvent('rotate', socket);
    bindSocketEvent('down', socket);
    bindSocketEvent('left', socket);
    bindSocketEvent('right', socket);
    bindSocketEvent('removeY', socket);
    bindSocketEvent('gameOver', socket);


    socket.on('disconnect', function () {
    })
})