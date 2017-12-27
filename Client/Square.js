// 五种方块模版
var Square = function () {
    // 获取随机 方向 方块形状
    var dirNum = Math.ceil(Math.random() * 4) - 1;
    var squareNum = Math.ceil(Math.random() * 5) - 1;

    var that = this;
    this.origin = {
        x: 0,
        y: 4,
        dir: null,
        squareNum: null
    };
    this.origin.dir = dirNum;
    this.origin.squareNum = squareNum;

    this.data = [
        [0, 0, 0, 0],
        [0, 0, 0, 0],
        [0, 0, 0, 0],
        [0, 0, 0, 0]
    ]

    // 方块 数据模版
    var squareData0 = [
        [
            [1, 1, 1, 1],
            [0, 0, 0, 0],
            [0, 0, 0, 0],
            [0, 0, 0, 0]
        ],
        [
            [1, 0, 0, 0],
            [1, 0, 0, 0],
            [1, 0, 0, 0],
            [1, 0, 0, 0]
        ],
        [
            [1, 1, 1, 1],
            [0, 0, 0, 0],
            [0, 0, 0, 0],
            [0, 0, 0, 0]
        ],
        [
            [1, 0, 0, 0],
            [1, 0, 0, 0],
            [1, 0, 0, 0],
            [1, 0, 0, 0]
        ]
    ]; // 1
    var squareData1 = [ // 7
        [
            [1, 1, 0, 0],
            [0, 1, 0, 0],
            [0, 1, 0, 0],
            [0, 0, 0, 0]
        ],
        [
            [1, 1, 0, 0],
            [1, 0, 0, 0],
            [1, 0, 0, 0],
            [0, 0, 0, 0]
        ],
        [
            [1, 0, 0, 0],
            [1, 1, 1, 0],
            [0, 0, 0, 0],
            [0, 0, 0, 0]
        ],
        [
            [0, 1, 0, 0],
            [0, 1, 0, 0],
            [1, 1, 0, 0],
            [0, 0, 0, 0]
        ]
    ]; // 7
    var squareData2 = [
        [
            [1, 1, 0, 0],
            [1, 1, 0, 0],
            [0, 0, 0, 0],
            [0, 0, 0, 0]
        ],
        [
            [1, 1, 0, 0],
            [1, 1, 0, 0],
            [0, 0, 0, 0],
            [0, 0, 0, 0]
        ],
        [
            [1, 1, 0, 0],
            [1, 1, 0, 0],
            [0, 0, 0, 0],
            [0, 0, 0, 0]
        ],
        [
            [1, 1, 0, 0],
            [1, 1, 0, 0],
            [0, 0, 0, 0],
            [0, 0, 0, 0]
        ]
    ]; // 田
    var squareData3 = [
        [
            [0, 1, 0, 0],
            [1, 1, 0, 0],
            [0, 1, 0, 0],
            [0, 0, 0, 0]
        ],
        [
            [1, 0, 0, 0],
            [1, 1, 0, 0],
            [1, 0, 0, 0],
            [0, 0, 0, 0]
        ],
        [
            [0, 1, 0, 0],
            [1, 1, 1, 0],
            [0, 0, 0, 0],
            [0, 0, 0, 0]
        ],
        [
            [1, 1, 1, 0],
            [0, 1, 0, 0],
            [0, 0, 0, 0],
            [0, 0, 0, 0]
        ]
    ]; // 上
    var squareData4 = [
        [
            [1, 0, 0, 0],
            [1, 1, 0, 0],
            [0, 1, 0, 0],
            [0, 0, 0, 0]
        ],
        [
            [0, 1, 0, 0],
            [1, 1, 0, 0],
            [1, 0, 0, 0],
            [0, 0, 0, 0]
        ],
        [
            [1, 1, 0, 0],
            [0, 1, 1, 0],
            [0, 0, 0, 0],
            [0, 0, 0, 0]
        ],
        [
            [0, 1, 1, 0],
            [1, 1, 0, 0],
            [0, 0, 0, 0],
            [0, 0, 0, 0]
        ]
    ]; // z

    // 获取指定 方向 方块
    this.getSquare = function (dir) {
        if (squareNum === 0) {
            if (dir) {
                return squareData0[dir];
            } else {
                that.data = squareData0[dirNum];
                return that.data;
            }

        } else if (squareNum === 1) {
            if (dir >= 0) {
                return squareData1[dir];
            } else {
                that.data = squareData1[dirNum];
                return that.data;
            }
        } else if (squareNum === 2) {
            if (dir >= 0) {
                return squareData2[dir];
            } else {
                that.data = squareData2[dirNum];
                return that.data;
            }
        } else if (squareNum === 3) {
            if (dir >= 0) {
                return squareData3[dir];
            } else {
                that.data = squareData3[dirNum];
                return that.data;
            }
        } else if (squareNum === 4) {
            if (dir >= 0) {
                return squareData4[dir];
            } else {
                that.data = squareData4[dirNum];
                return that.data;
            }
        }
        return false;
    };


    this.down = function () {
        this.origin.x++;
    }
    this.left = function () {
        this.origin.y--;
    }
    this.right = function () {
        this.origin.y++;
    }
    this.rotate = function () {
        if (this.origin.dir + 1 > squareData0.length - 1) {
            this.origin.dir = 0;
        } else {
            this.origin.dir++;
        }
        this.data = this.getSquare(this.origin.dir);
    }

    // 初始化执行一次
    this.getSquare();
};





