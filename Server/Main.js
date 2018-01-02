var app = require('http').createServer();
var io = require('socket.io')(app);

var PORT = 3000;

// 客户端计数
var clientCount = 0;

//  用来存储客户端socket
var socketMap = {};

app.listen(PORT);

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

    socket.on('disconnect', function () {

    })
})