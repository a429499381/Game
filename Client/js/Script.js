// socket
var socket = io('ws://localhost:3000');

var remote = new remoteGame(socket);
var local = new localGame(socket);
console.log('socket :' + 55);

socket.on('waiting', function (str) {
    document.getElementById('waiting').innerHTML = str;
})
socket.on('start', function (str) {
    document.getElementById('waiting').innerHTML = str;
})