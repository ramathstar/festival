var grid = document.querySelector("#grid");
var isPlayersMove = true;
const loseCounter = document.querySelector("#loseCounter");
const winCounter = document.querySelector("#winCounter");
const drawCounter = document.querySelector("#drawCounter");
const clearStatsBtn = document.querySelector("#clear-stats-btn");
const restartGameBtn = document.querySelector("#restart-game-btn");

clearStatsBtn.addEventListener("click", () => {
  localStorage.setItem("drawCount", 0);

  localStorage.setItem("wonCount", 0);

  localStorage.setItem("lossCount", 0);

  window.location.reload();
});

restartGameBtn.addEventListener("click", () => {
  window.location.reload();
});

function makeGrid(size) {
  if (size === 3) {
    return [
      [0, 0, 0],
      [0, 0, 0],
      [0, 0, 0]
    ];
  } else if (size === 4) {
    return [
      [0, 0, 0, 0],
      [0, 0, 0, 0],
      [0, 0, 0, 0],
      [0, 0, 0, 0]
    ];
  }
}

function generateRandomNumber() {
  return Math.floor(Math.random() * 3);
}
function targetRandomCell() {
  var i = generateRandomNumber();
  var j = generateRandomNumber();
  return `${i}${j}`;
}
function getAvailableCellCount() {
  let grid = JSON.parse(localStorage.getItem("grid"));
  let count = 0;
  grid.map(row => row.filter(cell => (cell === 0 ? count++ : null)));
  return count;
}

function getAvailableCells() {
  const grid = JSON.parse(localStorage.getItem("grid"));
  const swapped = grid.map((row, i) =>
    row.map((cell, j) => (row[i][j] = `${i}${j}`))
  );
  return swapped.map((row, i) => row.filter((cell, j) => grid[i][j] === 0));
}

function isCellSelected(id) {
  var g = JSON.parse(localStorage.getItem("grid"));
  var i = id[0];
  var j = id[0];
  return g[i][j] !== 0 ? true : false;
}
function getAvailableTargetCell() {
  var x = targetRandomCell();
  console.log(x);
  if (isCellSelected(x) || x === undefined) {
    getAvailableTargetCell();
  } else {
    return x;
  }
}
function generateRandomNumber(length) {
  return Math.floor(Math.random() * length);
}
function computersMove() {
  let moves = getAvailableCells().flat();

  let pick = generateRandomNumber(moves.length);

  var selectedCell = moves[pick];
  var i = selectedCell[0];
  var j = selectedCell[1];

  var gridRows = JSON.parse(localStorage.getItem("grid"));

  gridRows[i][j] = 2;

  console.log(gridRows);

  let cell = document.getElementById(selectedCell);
  localStorage.setItem("grid", JSON.stringify(gridRows));
  cell.innerHTML = "O";
  isPlayersMove = true;
}

function selectCell(cellNumber, cellId) {
  if (isPlayersMove) {
    var gridRows = JSON.parse(localStorage.getItem("grid"));
    gridRows[cellId[0]][cellId[1]] = cellNumber;
    localStorage.setItem("grid", JSON.stringify(gridRows));
    let cell = document.getElementById(cellId);
    cell.innerHTML = "X";
    isPlayersMove = false;

    if (getAvailableCellCount() > 0) {
      computersMove();
    }
    let msgBox = document.querySelector("#message-box");
    let status = checkCells();
    msgBox.innerHTML = status;

    if (status !== "Game In Progress") {
      isPlayersMove = false;
      localStorage.setItem(
        "grid",
        JSON.parse(localStorage.getItem("grid")).length
      );
    }

    if (status === "You Won!") {
      const count = Number(localStorage.getItem("wonCount"));
      localStorage.setItem("wonCount", count + 1);
      winCounter.innerHTML = localStorage.getItem("wonCount");
    }
    if (status === "You Lost") {
      const count = Number(localStorage.getItem("lossCount"));
      localStorage.setItem("lossCount", count + 1);
      loseCounter.innerHTML = localStorage.getItem("lossCount");
    }
    if (status === "It's a Draw!") {
      const count = Number(localStorage.getItem("drawCount"));
      localStorage.setItem("drawCount", count + 1);
      drawCounter.innerHTML = localStorage.getItem("drawCount");
    }
  }
}

function selectByPlayer(event) {
  selectCell(1, event.target.id);
}

function makeCell(id) {
  const cell = document.createElement("div");
  cell.className = "grid-cell";
  cell.id = id;
  cell.onclick = selectByPlayer;
  return cell;
}
function makeRow(row, id) {
  let cellRow = document.createElement("grid-row");
  cellRow.className = "grid-row";

  for (let i = 0; i < row.length; i++) {
    cellRow.appendChild(makeCell(`${id}${i}`));
  }

  return cellRow;
}
function renderGrid() {
  var gridRows = JSON.parse(localStorage.getItem("grid"));

  for (let i = 0; i < gridRows.length; i++) {
    grid.appendChild(makeRow(gridRows[i], i));
  }
}

function getDiagonal(grid) {
  return grid.map((row, i) => grid[i][i]);
}

function getDiagonals(grid) {
  return [getDiagonal(grid), getDiagonal([...grid].reverse())];
}

function getRows(grid) {
  const rows = [];

  grid.map((row, index) => {
    rows.push(row);
  });

  for (let i = 0; i < grid.length; i++) {
    let temp = [];
    for (let j = 0; j < grid.length; j++) {
      temp.push(grid[j][i]);
    }
    rows.push(temp);
  }

  return rows;
}

function isFilledByOnePlayer(row) {
  let current = row[0];

  if (current === 0) {
    return false;
  }

  for (let i = 0; i < row.length; i++) {
    if (row[i] !== current) {
      return false;
    }
  }
  return true;
}

function checkCells() {
  let winner = "Game In Progress";
  const gridder = JSON.parse(localStorage.getItem("grid"));
  const diagonals = getDiagonals(gridder);
  const rows = getRows(gridder);

  diagonals.map(diagonal => {
    if (isFilledByOnePlayer(diagonal)) {
      console.log(diagonal);
      if (diagonal[0] === 1) {
        winner = "You Won!";
      } else {
        winner = "You Lost";
      }
    }
  });

  rows.map(row => {
    if (isFilledByOnePlayer(row)) {
      console.log(row);
      if (row[0] === 1) {
        winner = "You Won!";
      } else {
        winner = "You Lost";
      }
    }
  });

  if (winner === "Game In Progress") {
    getAvailableCellCount() === 0 ? "It's a Draw!" : "Game In Progress";
  }
  console.log(winner);
  return winner;
}

window.addEventListener("DOMContentLoaded", () => {
  if (!localStorage.getItem("grid")) {
    localStorage.setItem("grid", JSON.stringify(makeGrid(3)));
  }

  renderGrid();

  if (!localStorage.getItem("drawCount")) {
    localStorage.setItem("drawCount", 0);
  }
  if (!localStorage.getItem("wonCount")) {
    localStorage.setItem("wonCount", 0);
  }

  if (!localStorage.getItem("lossCount")) {
    localStorage.setItem("lossCount", 0);
  }

  winCounter.innerHTML = localStorage.getItem("wonCount");
  loseCounter.innerHTML = localStorage.getItem("lossCount");
  drawCounter.innerHTML = localStorage.getItem("drawCount");
});

const x3 = document.querySelector("#mediumLevel");
x3.addEventListener("click", () => {
  localStorage.setItem("grid", JSON.stringify(makeGrid(3)));
  window.location.reload();
});
const x4 = document.querySelector("#hardLevel");
x4.addEventListener("click", () => {
  localStorage.setItem("grid", JSON.stringify(makeGrid(4)));
  window.location.reload();
});
