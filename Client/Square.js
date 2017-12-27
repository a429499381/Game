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
        [0,0,0,0],
        [0,0,0,0],
        [0,0,0,0],
        [0,0,0,0]
    ]

    // 方块 数据模版
    this.squareData0 = [
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
    this.squareData1 = [ // 7
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
    this.squareData2 = [
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
    this.squareData3 = [
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
    this.squareData4 = [
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
            return that.squareData0[dir ? dir : dirNum];
        } else if (squareNum === 1) {
            return that.squareData1[dir ? dir : dirNum]
        } else if (squareNum === 2) {
            return that.squareData2[dir ? dir : dirNum]
        } else if (squareNum === 3) {
            return that.squareData3[dir ? dir : dirNum]
        } else if (squareNum === 4) {
            return that.squareData4[dir ? dir : dirNum]
        }
        return false;
    };


    this.down =function () {
        this.origin.x++;
    }
    this.left = function () {
        this.origin.y--;
    }
    this.right = function () {
        this.origin.y++;
    }
    this.rotate = function () {
        if(this.origin.dir + 1 > that.squareData0.length - 1) {
            this.origin.dir = 0;
        } else {
            this.origin.dir++;
        }
    }
};





