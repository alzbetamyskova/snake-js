'use strict';

console.log('Funguju!');

// canvas
const canvas = document.querySelector('canvas');
const ctx = canvas.getContext("2d");

// player
let snakeSize = 50;

let snakeSpeed = 1;
let snakePosX = 0;
let snakePosY = canvas.height / 2 - snakeSize / 2;

let velocityX = 0;
let velocityY = 0;

// loop
const gameLoop = () => {

  drawStuff();
  moveStuff();
  requestAnimationFrame(gameLoop); 

};

// functions

// ** MOVE EVERYTHING
const moveStuff = () => {

  snakePosX += snakeSpeed * velocityX;
  snakePosY += snakeSpeed * velocityY;

  if (snakePosX > canvas.width) {
    snakePosX = 0;
  };
  if (snakePosX < 0) {
    snakePosX = canvas.width;
  };
  if (snakePosY > canvas.height) {
    snakePosY = 0;
  };
  if (snakePosY < 0) {
    snakePosY = canvas.height;
  };

};

// ** DRAW EVERYTHING
const drawStuff = () => {

  rectangle('white', 0, 0, canvas.width, canvas.height);
  
  rectangle('black', snakePosX, snakePosY, snakeSize, snakeSize);

};

// draw rectangle
const rectangle = (color, x, y, width, height) => {

  ctx.fillStyle = color;
  ctx.fillRect(x, y, width, height);

};

// ** KEYBOARD
const keyPush = (event) => {

  switch (event.key) {
    case 'ArrowLeft':
      velocityX = -1;
      velocityY = 0;
      break;

    case 'ArrowUp':
      velocityX = 0;
      velocityY = -1;
      break;

    case 'ArrowRight':
      velocityX = 1;
      velocityY = 0;
      break;
          
    case 'ArrowDown':
      velocityX = 0;
      velocityY = 1;
      break;
  };
};

// listeners
document.addEventListener('keydown', keyPush);

gameLoop();