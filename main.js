'use strict';

console.log('Funguju!');

// canvas
const canvas = document.querySelector('canvas');
const title = document.querySelector('h1');
const ctx = canvas.getContext("2d");

// player
let snakeSize = 30;

let snakeSpeed = snakeSize;
let snakePosX = 0;
let snakePosY = canvas.height / 2;

let velocityX = 0;
let velocityY = 0;

// food
let foodPosX = 0;
let foodPosY = 0;

// game
let score = 0;
const fps = 15;

const tileCountX = canvas.width / snakeSize;
const tileCountY = canvas.height / snakeSize;

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
  if (snakePosX > canvas.width - snakeSize) {
    snakePosX = 0;
  };
  if (snakePosX < 0) {
    snakePosX = canvas.width;
  };
  if (snakePosY > canvas.height - snakeSize) {
    snakePosY = 0;
  };
  if (snakePosY < 0) {
    snakePosY = canvas.height;
  };

  // food colision
  if (snakePosX === foodPosX && snakePosY === foodPosY) {
    title.textContent = ++score;
    resetFood()
  };

};

// ** DRAW EVERYTHING
const drawStuff = () => {

  rectangle('#EDEDED', 0, 0, canvas.width, canvas.height);

  drawGrid()

  rectangle('#a4da00', foodPosX, foodPosY, snakeSize, snakeSize)
  
  rectangle('#DA0037', snakePosX, snakePosY, snakeSize, snakeSize);

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
      snakeSize * i,
      snakeSize * j,
      snakeSize - 1,
      snakeSize - 1)
    };
  };

};

// reset food
const resetFood = () => {
  foodPosX = Math.floor(Math.random() * tileCountX) * snakeSize;
  foodPosY = Math.floor(Math.random() * tileCountY) * snakeSize;
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