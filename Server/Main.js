var app = require('http').createServer();
var io = require('socket.io')(app);

var PORT = 3000;

//  用来存储客户端socket
var socketMap = [];

// 所有组队的表
var terams = [];

// 所有客户端 id
var allMap = [];

var temp = [];



app.listen(PORT);

var bingListener = function (socket, event) {
    socket.on(event, function (data) {
        // 发送 接受到 初始化信息 发送给对方
        if(socket.clientNum % 2 === 0) {
            socketMap[socket.clientNum -1].emit(event, data);
        } else {
            socketMap[socket.clientNum + 1].emit(event, data);
        }

    })
}

var responseTearm = function (socket, id) {
            // 随机生成剩余没有组队id数
            var randdomId = Math.ceil(Math.random() * (socketMap.length -1));

            for(var i = 0; i < terams.length; i++) {
                for(var j = 0; j < terams[0].length; j++) {
                    if(terams[i][j] !== id) {
                        terams.push([id, socketMap[randdomId]]);

                    }
                }
            }
}

io.on('connection', function (socket) {

    temp.push(socket.id);
    socketMap.push(socket.id);
    allMap.push(socket.id);


    console.log('temp' + temp);
   if(temp.length > 0) {
        socket.emit('waiting', '等待其他玩家连接');

    } else {
        socket[temp[0]].emit('start', 'ok');
        socket[temp[1]].emit('start', 'ok');
        socketMap.pop();
        socketMap.pop();
        terams.push(temp);
        temp = [];

    }

    responseTearm(socket, 'responseTearm');
    bingListener(socket, 'init');
    bingListener(socket, 'next');
    bingListener(socket, 'rotate');
    bingListener(socket, 'right');
    bingListener(socket, 'left');
    bingListener(socket, 'down');
    bingListener(socket, 'fastDown');
    bingListener(socket, 'fixed');

    socket.on('disconnect', function () {
        console.log(socketMap);

    })
})

console.log('服务端启动' + PORT);


