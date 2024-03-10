"use strict";

window.addEventListener("load", start);

// ******** CONTROLLER ********

let points = 0;

function start() {
  console.log(`Javascript kører`);

  //window.addEventListener("keydown", keyPress);{}
  
  // start ticking
  tick();

  // check for collision, start after 3 seconds. To account for bug 
  setInterval(checkForCollision, 3000);

  makeGoals();

}

function makeGoals(){
  setInterval(function(){
    let row, col;
    do {
      row = Math.floor(Math.random() * 10);
      col = Math.floor(Math.random() * 10);
    } while (readFromCell(row, col) === 1); 
    writeToCell(row, col, 2);
    displayBoard();
  }, 5000);
}
  
  document.addEventListener("keydown", keyDown);
  document.addEventListener("keyup", keyUp);

  function keyDown(event){
    switch(event.key){
      case "a":
      case "ArrowLeft": controls.left = true; break;
      case "d": 
      case "ArrowRight": controls.right = true; break;
      case "w":
      case "ArrowUp": controls.up = true; break;
      case "s":
      case "ArrowDown": controls.down = true; break;
  }
}

  function keyUp(event){
    switch(event.key){
      case "a": 
      case "ArrowLeft": controls.left = false; break;
      case "d": 
      case "ArrowRight": controls.right = false; break;
      case "w":
      case "ArrowUp": controls.up = false; break;
      case "s":
      case "ArrowDown": controls.down = false; break;
        
  }

}

const controls = {
  left: false,
  right: false,
  up: false,
  down: false,
};

function tick() {
  // setup next tick
  setTimeout(tick, 500);

  // remove player from current position
  for(const part of queue){
  writeToCell(part.row, part.col, 0);
  }

  if (controls.left) {
    direction = "left";
  } else if (controls.right) {
    direction = "right";
  } else if (controls.up) {
    direction = "up";
  } else if (controls.down) {
    direction = "down";
  }

  const head = {
    row: queue[queue.length - 1].row,
    col: queue[queue.length - 1].col,
  }



  // move part in the direction with case

  switch (direction) {
    case "left":
      head.col--;
      if (head.col < 0) {
        head.col = 9;
      }
      break;
    case "right":
      head.col++;
      if (head.col > 9) {
        head.col = 0;
      }
      break;
    case "up":
      head.row--;
      if (head.row < 0) {
        head.row = 9;
      }
      break;
    case "down":
      head.row++;
      if (head.row > 9) {
        head.row = 0;
      }
      break;
    }

    // Add new head to queue
    queue.push(head);

    if (readFromCell(head.row, head.col) === 2) {
      writeToCell(head.row, head.col, 0);
      points++;
      displayPoints();
    } else {
      queue.shift();
    }

  // re-add player to new position
  for (const part of queue) {
    writeToCell(part.row, part.col, 1);
  }

  // display the model in full
  displayBoard();
}

function checkForCollision() {
  setTimeout(checkForCollision, 500);
  for (let i = 0; i < queue.length - 1; i++) {
    if (queue[i].row === queue[queue.length - 1].row && queue[i].col === queue[queue.length - 1].col) {
     gameOver();
    }
  }
}

// ******** MODEL ********
const model = [
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
];

function writeToCell(row, col, value) {
  model[row][col] = value;
}

function readFromCell(row, col) {
  return model[row][col];
}


let direction = "left";

const queue = [
  { row: 5, col: 5 },
  { row: 5, col: 6 },
  { row: 5, col: 7 },
];

const goal = { 
  row: 5, col: 5
};



// ******** VIEW ********

const pointsDisplay = document.querySelector("#points");


function displayBoard() {
  const cells = document.querySelectorAll("#grid .cell");
  for (let row = 0; row < 10; row++) {
    for (let col = 0; col < 10; col++) {
      const index = row * 10 + col;

      switch (readFromCell(row, col)) {
        case 0:
          cells[index].classList.remove("player", "goal");
          break;
        case 1: // Note: doesn't remove goal if previously set
          cells[index].classList.add("player");
          break;
        case 2: // Note: doesn't remove player if previously set
          cells[index].classList.add("goal");
          break;
      }
    }
  }
}

function displayPoints() {
  pointsDisplay.textContent = "Points: " + points;
}

function gameOver(){
  alert("Game over");
  location.reload();
  return false;
}
