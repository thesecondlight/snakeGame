const canvas = document.querySelector('.canvas');
const ctx = canvas.getContext('2d');

//计算画板-横竖的小格子数量
const size = 10;
const row = canvas.height / size;
const column = canvas.width / size;

//
let timer = null;
//创建贪吃蛇
let snake = new Snake(size, {
    canvas,
    ctx
});
//创建食物
let target = new Target(size, {
    canvas,
    ctx,
    row,
    column
})

function init() {
    target.genRandomLocation();
    target.draw();
    snake.draw();
}
init();

//开始按钮
const startBtn = document.getElementById("start");
const stopBtn = document.getElementById("stop");

function start() {
    timer = setInterval(() => {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        target.draw();
        snake.update();
        snake.draw(target);
        //如果snake吃食物
        if (snake.eatTarget(target)) {
            target.genRandomLocation();
        }
        //吃到自己
        snake.checkCollison();
        //更新分数
        document.getElementById("score").innerText = snake.targetNum;

    }, 150);
}

startBtn.addEventListener("click", () => {
    start()
});
stopBtn.addEventListener("click", () => {
    clearInterval(timer);
})

//监听鼠标点击的方向
window.addEventListener("keydown", (e) => {
    const direction = e.key.replace('Arrow', '');
    console.log("direction:", direction);
    snake.changeDirection(direction);
})