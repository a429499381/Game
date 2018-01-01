var localGame = function () {
    var game;
    var doms = {
        gameDiv: document.getElementById('localGame'),
        nextDiv: document.getElementById('localNext'),
        gameTimeDiv: document.getElementById('localTime'),
        gameScoreDiv: document.getElementById('localScore')
    }
    var start = function () {
        game = new Game(doms);
        game.init();
        game.keyEvent();
        game.autoMove();
    }
    this.start = start;
}
console.log(16);
new localGame().start();
