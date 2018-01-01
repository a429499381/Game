var remoteGame = function () {
    var game;

    var bindEvent = function () {
        document.getElementById('left').onclick = function () {
            game.left();
        };
        document.getElementById('right').onclick = function () {
            game.right();
        };
        document.getElementById('down').onclick = function () {
            game.down();
        };
        document.getElementById('fastDown').onclick = function () {
            game.fastDown();
        };
        document.getElementById('rotate').onclick = function () {
            game.rotate();
        };
        document.getElementById('gameOver').onclick = function () {
            game.gameOver();
        };
        document.getElementById('setTime').onclick = function () {
            game.upTimeSocre(doms.gameTimeDiv,10);
        };
        document.getElementById('setScore').onclick = function () {
            game.upTimeSocre(doms.gameScoreDiv,1);
        };
        document.getElementById('setData').onclick = function () {
            game.refresh();
        };
        document.getElementById('randomCreateline').onclick = function () {
            game.randomCreateline(1);
        };
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