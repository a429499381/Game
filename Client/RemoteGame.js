var remoteGame = function () {
    var game;

    var bindEvent = function () {
        document.getElementById('left').onclick = function () { game.left(); };
        document.getElementById('right').onclick = function () { game.right(); };
        document.getElementById('down').onclick = function () { game.down(); };
        document.getElementById('fastDown').onclick = function () { game.fastDown(); }
    }

    var doms = {
        gameDiv: document.getElementById('remoteGame'),
        nextDiv: document.getElementById('remoteNext'),
        gameTimeDiv: document.getElementById('remoteTime'),
        gameScoreDiv: document.getElementById('remoteScore')
    }
    var start = function () {
        game = new Game(doms);
        game.init();
    }
    this.start = start;
    this.bindEvent = bindEvent;
}
console.log(17);
var remote = new remoteGame();
remote.start();
remote.bindEvent();