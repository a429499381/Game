var localGame = function () {
    var game;
    var doms = {
        gameDiv: document.getElementById('game'),
        nextDiv: document.getElementById('next'),
        gameTimeDiv: document.getElementById('time'),
        gameScoreDiv: document.getElementById('score')
    }
    var start = function () {
        game = new Game(doms);
        game.init();
    }
    this.start = start;
}
console.log(14);
new localGame().start();
