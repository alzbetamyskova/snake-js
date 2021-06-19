'use strict';

console.log('Funguju!');

// canvas
const canvas = document.querySelector('canvas');
const title = document.querySelector('h1');
const ctx = canvas.getContext("2d");

// game
let tileSize = 30;
let score = 0;
const fps = 15;

const tileCountX = canvas.width / tileSize;
const tileCountY = canvas.height / tileSize;

// player
let snakeSpeed = tileSize;
let snakePosX = 0;
let snakePosY = canvas.height / 2;

let velocityX = 0;
let velocityY = 0;

let tail = []
let snakeLength = 1;

// food
let foodPosX = 0;
let foodPosY = 0;

// loop
const gameLoop = () => {

  drawStuff();
  moveStuff();
  setTimeout(gameLoop, 1000 / fps); 

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

  // tail
  tail.push({x: snakePosX, y: snakePosY});

  // forget earliest parts of snake
  tail = tail.slice(-1 * snakeLength);

  // food colision
  if (snakePosX === foodPosX && snakePosY === foodPosY) {
    title.textContent = ++score;
    snakeLength++;
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
  
  // snake
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
      tileSize - 1,
      tileSize - 1)
    };
  };

};

// reset food
const resetFood = () => {
  foodPosX = Math.floor(Math.random() * tileCountX) * tileSize;
  foodPosY = Math.floor(Math.random() * tileCountY) * tileSize;
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
  };
};

// listeners
document.addEventListener('keydown', keyPush);

resetFood();
gameLoop();