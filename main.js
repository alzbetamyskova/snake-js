'use strict';

// canvas
const canvas = document.querySelector('canvas');
const title = document.querySelector('h1');
const ctx = canvas.getContext("2d");

// game
let gameIsRunning = true;

let fps = 5;
let tileSize = 30;
let tileSizeForCircle = tileSize / 2;
const tileCountX = canvas.width / tileSize;
const tileCountY = canvas.height / tileSize;

let score = 0;

// player
let snakeSpeed = tileSize;
let snakePosX = 0;
let snakePosY = canvas.height / 2;

let velocityX = 1;
let velocityY = 0;

let tail = [];
let snakeLength = 1;

// food
let foodPosX = 0;
let foodPosY = 0;

// audio
const audioBlop = new Audio('./assets/Blop.mp3');
const audioTrombone = new Audio('./assets/Trombone.mp3');

// loop
const gameLoop = () => {
  if (gameIsRunning) {
    drawStuff();
    moveStuff();
    setTimeout(gameLoop, 1000 / fps); 
  };
};

// functions

// ** MOVE EVERYTHING
const moveStuff = () => {

  snakePosX += snakeSpeed * velocityX;
  snakePosY += snakeSpeed * velocityY;

  // wall colision
  if (snakePosX > canvas.width - tileSize) {
    snakePosX = 0;
  };
  if (snakePosX < 0) {
    snakePosX = canvas.width;
  };
  if (snakePosY > canvas.height - tileSize) {
    snakePosY = 0;
  };
  if (snakePosY < 0) {
    snakePosY = canvas.height;
  };

  // GAME OVER - tail colision
  tail.forEach((snakePart) => {
    if (snakePosX === snakePart.x && snakePosY === snakePart.y) {
      gameOver();
    };
  });

  // tail
  tail.push({x: snakePosX, y: snakePosY});

  // forget earliest parts of snake
  tail = tail.slice(-1 * snakeLength);

  // food colision
  if (snakePosX === foodPosX && snakePosY === foodPosY) {
    audioBlop.play();
    title.textContent = ++score;
    snakeLength++;
    {fps === 25 ? '' : fps = fps + 1};
    resetFood()
  };

};

// ** DRAW EVERYTHING
const drawStuff = () => {

  // background
  rectangle('#EDEDED', 0, 0, canvas.width, canvas.height);

  // grid
  drawGrid()

  // food
  rectangle('#a4da00', foodPosX, foodPosY, tileSize, tileSize)

  // tail
  tail.forEach((snakePart) => 
    rectangle('#c1274d', snakePart.x, snakePart.y, tileSize, tileSize)
  );
  
  // snake head
  rectangle('#DA0037', snakePosX, snakePosY, tileSize, tileSize);

};

// draw rectangle
const rectangle = (color, x, y, width, height) => {

  ctx.fillStyle = color;
  ctx.fillRect(x, y, width, height);

};

// draw grid
const drawGrid = () => {

  for ( let i = 0; i < tileCountX; i ++) {
    for (let j = 0; j < tileCountY; j ++) {
    rectangle(
      '#444444',
      tileSize * i,
      tileSize * j,
      tileSize,
      tileSize)
    };
  };

};

// reset food
const resetFood = () => {

  // GAME OVER - nowhere to go
  if (snakeLength === tileCountX * tileCountY) {
    gameOver();
  };

  foodPosX = Math.floor(Math.random() * tileCountX) * tileSize;
  foodPosY = Math.floor(Math.random() * tileCountY) * tileSize;

  // dont spawn food on snakes head
  if (foodPosX === snakePosX && foodPosY === snakePosY) {
    resetFood();
  };

  // dont spawn food on any snake part
  if (
    tail.some((snakePart) => snakePart.x === foodPosX && snakePart.y === foodPosY)) {
    resetFood();
  };

};

// game over
const gameOver = () => {
  audioTrombone.play();
  title.innerHTML = `Prohrál si s ${score} body.`;
  gameIsRunning = false;
};

// ** KEYBOARD
const keyPush = (event) => {

  switch (event.key) {
    case 'ArrowLeft':
      if (velocityX !== 1) {
        velocityX = -1;
        velocityY = 0;
      }
      break;

    case 'ArrowUp':
      if (velocityY !== 1) {
        velocityX = 0;
        velocityY = -1;
      }
      break;

    case 'ArrowRight':
      if (velocityX !== -1) {
        velocityX = 1;
        velocityY = 0;
      }
      break;
          
    case 'ArrowDown':
      if (velocityY !== -1) {
        velocityX = 0;
        velocityY = 1;
      }
      break;

    default:
      // restart game
      if (!gameIsRunning) {
        location.reload()
      }
      break;
  };

};

// listeners
document.addEventListener('keydown', keyPush);

resetFood();
gameLoop();