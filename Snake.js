function Snake(size = 10, canvasOptions) {
    this.x = 0;
    this.y = 0;
    this.size = size;
    this.xSpeed = size * 1;
    this.ySpeed = 0;
    this.canvas = canvasOptions;
    //snake吃了多少食物
    this.targetNum = 0;
    //存储snake每个点的坐标
    this.tails = [];

}

//初始化snake
Snake.prototype.draw = function (target) {
    const {
        ctx
    } = this.canvas;
    ctx.fillStyle = "#fff";

    for (let i = 0; i < this.tails.length; i++) {
        const {
            x,
            y
        } = this.tails[i];
        //吃完变成食物的颜色
        ctx.fillStyle = target.targetFillStyle
        ctx.fillRect(x, y, this.size, this.size);
    }

    ctx.fillRect(this.x, this.y, this.size, this.size);
}

//更新snake
Snake.prototype.update = function () {
    // 吃食物增加snake的长度 存储进新的坐标点
    for (let i = 0; i < this.tails.length - 1; i++) {
        this.tails[i] = this.tails[i + 1];
    }
    if (this.targetNum > 0) {
        this.tails[this.targetNum - 1] = {
            x: this.x,
            y: this.y
        }
    }
    //
    this.x += this.xSpeed;
    this.y += this.ySpeed;

    //控制边界
    const {
        width,
        height
    } = this.canvas.canvas;
    if (this.x > width) {
        this.x = 0;
    }
    if (this.y > height) {
        this.y = 0;
    }
    if (this.x < 0) {
        this.x = width;
    }
    if (this.y < 0) {
        this.y = height;
    }

}
//改变方向
Snake.prototype.changeDirection = function (direction) {
    switch (direction) {
        case "Up":
            this.xSpeed = 0;
            this.ySpeed = -size * 1;
            break;
        case "Down":
            this.xSpeed = 0;
            this.ySpeed = size * 1;
            break;
        case "Right":
            this.xSpeed = size * 1;
            this.ySpeed = 0;
            break;
        case "Left":
            this.xSpeed = -size * 1;
            this.ySpeed = 0;
            break;

    }
}
//吃到食物 target
Snake.prototype.eatTarget = function (target) {
    if (this.x === target.x && this.y === target.y) {
        this.targetNum++;
        return true;
    }
    return false;

}
//吃到自己
Snake.prototype.checkCollison = function () {
    for (let i = 0; i < this.tails.length; i++) {
        if (this.x === this.tails[i].x && this.y === this.tails.y) {
            this.targetNum = 0;
            this.tails = [];
        }

    }
}