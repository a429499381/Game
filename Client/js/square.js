var Square = function () {
    // 方块数据
    this.data = [
        [1, 0, 0, 0],
        [1, 0, 0, 0],
        [1, 0, 0, 0],
        [1, 0, 0, 0]
    ];

    // 原点
    this.origin = {
        x: 0,
        y: 0
    };

    // 方向
    this.dir = 0;

    // 旋转数组
    this.rotates = [
        [
            [0,1,0,0],
            [0,1,0,0],
            [0,1,0,0],
            [0,1,0,0]
        ],
        [
            [0,0,0,0],
            [1,1,1,1],
            [0,0,0,0],
            [0,0,0,0]
        ],
        [
            [0,1,0,0],
            [0,1,0,0],
            [0,1,0,0],
            [0,1,0,0]
        ],
        [
            [0,0,0,0],
            [1,1,1,1],
            [0,0,0,0],
            [0,0,0,0]
        ]
    ];
}

Square.prototype.canRotate = function (isValid) {
    var test = {};
    this.dir = this.dir + 1;
    if(this.dir === 4) {
        this.dir = 0;
    }
    for(var i = 0; i < this.data.length; i++) {
        for(var j = 0; j < this.data[0].length; j++) {
            this.data[i][j] = this.rotates[this.dir][i][j];
        }
    }
    test.x = this.origin.x + 1;
    test.y = this.origin.y;
    return isValid(test, this.data);
}
Square.prototype.rotate = function () {
    this.origin.x = this.origin.x + 1;
}

Square.prototype.canDown = function (isValid) {
    var test = {};
    test.x = this.origin.x + 1;
    this.y = this.origin.y;
    return isValid(test, this.data);
}
Square.prototype.down = function () {
    this.origin.x = this.origin.x + 1;
}

Square.prototype.canLeft = function (isValid) {
    var test = {};
    test.x = this.origin.x;
    test.y = this.origin.y - 1;
    return isValid(test, this.data);
}
Square.prototype.left = function () {
    this.origin.y = this.origin.y - 1;
}

Square.prototype.canRight = function (isValid) {
    var test = {};
    test.x = this.origin.x;
    test.y = this.origin.y + 1;
    return isValid(test, this.data);
}
Square.prototype.right = function () {
    this.origin.y = this.origin.y + 1;
}