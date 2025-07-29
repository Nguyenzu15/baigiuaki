const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

const scale = 20;
const rows = canvas.height / scale;
const columns = canvas.width / scale;

canvas.width = 400;
canvas.height = 400;

let snake = [];
snake[0] = { x: 10 * scale, y: 10 * scale };

let direction;
let food = {
    x: Math.floor(Math.random() * columns) * scale,
    y: Math.floor(Math.random() * rows) * scale
};

let score = 0;
let gameInterval;
let gameRunning = false;

document.addEventListener('keydown', changeDirection);
document.getElementById('startBtn').addEventListener('click', startGame);
document.getElementById('pauseBtn').addEventListener('click', pauseGame);
document.getElementById('restartBtn').addEventListener('click', restartGame);

function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    // Draw food
    ctx.fillStyle = 'red';
    ctx.fillRect(food.x, food.y, scale, scale);

    // Draw snake
    for (let i = 0; i < snake.length; i++) {
        ctx.fillStyle = 'green';
        ctx.fillRect(snake[i].x, snake[i].y, scale, scale);
    }

    // Move snake
    let snakeX = snake[0].x;
    let snakeY = snake[0].y;

    if (direction === 'LEFT') snakeX -= scale;
    if (direction === 'RIGHT') snakeX += scale;
    if (direction === 'UP') snakeY -= scale;
    if (direction === 'DOWN') snakeY += scale;

    let newHead = {
        x: snakeX,
        y: snakeY
    };

    if (snakeX === food.x && snakeY === food.y) {
        food = {
            x: Math.floor(Math.random() * columns) * scale,
            y: Math.floor(Math.random() * rows) * scale
        };
        score++;
        document.getElementById('score').innerText = `Score: ${score}`;
    } else {
        snake.pop();
    }

    snake.unshift(newHead);

    // Check for collision with walls or self
    if (snakeX < 0 || snakeX >= canvas.width || snakeY < 0 || snakeY >= canvas.height || collision(newHead, snake)) {
        restartGame();  // Restart game on collision
    }
}

function collision(head, array) {
    for (let i = 0; i < array.length; i++) {
        if (head.x === array[i].x && head.y === array[i].y) {
            return true;
        }
    }
    return false;
}

function changeDirection(event) {
    if (event.keyCode === 37 && direction !== 'RIGHT') direction = 'LEFT';
    if (event.keyCode === 38 && direction !== 'DOWN') direction = 'UP';
    if (event.keyCode === 39 && direction !== 'LEFT') direction = 'RIGHT';
    if (event.keyCode === 40 && direction !== 'UP') direction = 'DOWN';
}
