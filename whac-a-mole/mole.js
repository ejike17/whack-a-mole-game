let currentMoleTile;
let currentPlantTile;
let score = 0;
let gameOver = false;
let time = 15;

window.onload = function () {
  setGame();
};

function setGame() {
  //Set the grid for the game board
  for (let i = 0; i < 9; i++) {
    let tile = document.createElement("div");
    tile.id = i.toString();
    tile.addEventListener("click", selectTile);
    document.getElementById("board").appendChild(tile);
    tile.addEventListener("click", selectTile);
  }

  setInterval(setMole, 1000); //Calls this function every 1 second
  setInterval(setPlant, 2000); //Calls this function every 2 seconds
}

function getRandomFile() {
  //Math.random, returns a number between 0-9
  let num = Math.floor(Math.random() * 9);
  return num.toString();
}

function setMole() {
  if (gameOver) return;

  if (currentMoleTile) {
    currentMoleTile.innerHTML = "";
  }

  let mole = document.createElement("img");
  mole.src = "./monty-mole.png";

  let num = getRandomFile();
  if (currentMoleTile && currentMoleTile.id == num) {
    return;
  }
  currentMoleTile = document.getElementById(num);
    currentMoleTile.appendChild(mole);
    
  //This section handles timing which can lead to game over if player doesn't get 100 points in less than 15 second
  document.getElementById("time").innerText = `Time: ${time}`;
  time -= 1;
  if (time < 0 && score < 100) {
    document.getElementById(
      "score"
    ).innerText = `Game Over (Time Expired), Score: ${score.toString()}`;
    gameOver = true;
  }
}

function setPlant() {
  if (gameOver) return;
  if (currentPlantTile) {
    currentPlantTile.innerHTML = "";
  }

  let plant = document.createElement("img");
  plant.src = "./piranha-plant.png";

  let num = getRandomFile();

  if (currentPlantTile && currentPlantTile.id == num) {
    return;
  }
  currentPlantTile = document.getElementById(num);
  currentPlantTile.appendChild(plant);
}

function selectTile() {
  if (gameOver) return;
  if (this == currentMoleTile) {
    score += 10;
    document.getElementById("score").innerText = score.toString();
  } else if (this == currentPlantTile) {
    document.getElementById(
      "score"
    ).innerText = `Game Over ${score.toString()}`;
    gameOver = true;
  }
}
