var localGame = function () {
    var doms = {
        gameDiv: document.getElementById('game'),
        nextDiv: document.getElementById('next'),
        gameTimeDiv: document.getElementById('time'),
        gameScoreDiv: document.getElementById('score')
    }
    var start = function () {

        var game = new Game();

        game.initData(doms);
        game.setData();
        game.refresh(gameData, gameDivs);
//         initData();
//         setData(curr, gameData);
//         refresh(gameData, gameDivs);
//         refresh(next.data, nextDivs);
//         upSocre(gameScore);
//
// // 自动下移
//         autoMove();
    }
    this.start = start;
}
console.log(7);
new localGame().start();
