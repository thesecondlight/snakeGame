//食物
function Target(size = 10, canvasOptions) {
    this.x
    this.y
    this.size = size;
    this.canvas = canvasOptions;
    this.targetFillStyle="#00ccff";
}
//位置生成
Target.prototype.genRandomLocation = function () {
    const {
        row,
        column
    } = this.canvas;
    this.x = (Math.floor(Math.random() * column - 1) + 1) * this.size;
    this.y = (Math.floor(Math.random() * row - 1) + 1) * this.size;
}

Target.prototype.draw = function () {
    const {
        ctx
    } = this.canvas;
    ctx.fillStyle = this.targetFillStyle;
    ctx.fillRect(this.x, this.y, this.size, this.size);
}