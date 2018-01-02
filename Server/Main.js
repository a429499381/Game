var app = require('http').createServer();
var io = require('socket.io')(app);

var PORT = 3000;

// 客户端计数
var clientCount = 0;

//  用来存储客户端socket
var socketMap = {};

app.listen(PORT);

var bingListener = function (socket, event) {
    socket.on(event, function (data) {
        // 发送 接受到 初始化信息 发送给对方
        if(socket.clientNum % 2 === 0) {
            socketMap[socket.clientNum -1].emit(event, data);
        } else {
            socketMap[socket.clientNum + 1].emit(event, data);
        }
        console.log(data);
    })
}

io.on('connection', function (socket) {
    clientCount = clientCount + 1;
    socket.clientNum = clientCount;
    socketMap[clientCount] = socket;

    if(clientCount % 2 === 1) {
        socket.emit('waiting', '等待其他玩家连接');

    } else {
        socket.emit('start', '准备开始');
        socketMap[(clientCount -1)].emit('str  OK')
    }

    bingListener(socket, 'init');
    bingListener(socket, 'next');
    bingListener(socket, 'rotate');
    bingListener(socket, 'right');
    bingListener(socket, 'left');
    bingListener(socket, 'down');
    bingListener(socket, 'fastDown');
    bingListener(socket, 'fixed');

    socket.on('disconnect', function () {

    })
})