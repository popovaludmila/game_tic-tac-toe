// Создаем игровое поле
const board = document.querySelector(".board");
const winnerText = document.querySelector('.winner');
const turnText = document.querySelector('.turn-text');
const restartBtn = document.querySelector('.restart');
const cells = document.querySelectorAll('.cell');

let gameRunning = false;
let gameOver = false;
let boardState = Array(9).fill("");
let currentPlayer = "";

const players = {
  x: "X",
  o: "O"
};

const winCombinations = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8], // горизонтальные линии
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8], // вертикальные линии
  [0, 4, 8],
  [2, 4, 6], // диагональные линии
];

function initializeGame() {
  cells.forEach(cell => {
    cell.addEventListener('click', clickOnCell);
  })

  restartBtn.addEventListener('click', restartGame);
}

// Начальное состояние игры
function startGame() {
  gameRunning = true;
  cells.forEach(cell => cell.textContent = "");
  winnerText.textContent = "";
  currentPlayer = players.x;
  turnText.textContent = `Ход игрока: ${currentPlayer}`;
}

function clickOnCell() {
  if (!gameRunning) {
    return;
  }

  if (this.textContent) {
    return;
  }

  this.textContent = currentPlayer;

  const cellIndex = this.dataset.index;

  boardState[cellIndex] = currentPlayer;

  if (checkGameOver()) {
    return finishGame();
  }
  this.style.cursor = "not-allowed";
  currentPlayer = (currentPlayer === players.x) ? players.o : players.x;
  turnText.textContent = `Ход игрока: ${currentPlayer}`;
};

//Проверка ничьи
function checkDraw() {
  return boardState.every((el) => el.textContent !== "");
};

// Проверка победы
function checkWin() {
  return winCombinations.some((combination) => {
    const [a, b, c] = combination;

    const cellA = boardState[a];
    const cellB = boardState[b];
    const cellC = boardState[c];

    if ([cellA, cellB, cellC].includes("")) {
      return false;
    }
    return cellA === cellB && cellB === cellC;
  });
}

// Проверка окончания игры
function checkGameOver() {
  if (checkWin()) {
    winnerText.textContent = `Победил игрок ${currentPlayer}`;
    turnText.textContent = "";
    return true;
  }

  if(!boardState.includes("")) {
    winnerText.textContent = `Победила дружба! Ничья`;
    turnText.textContent = "";
    return true;
  }
}

//Конец игры
function finishGame() {
  gameRunning = true;
  turnText.textContent = "";
};

function restartGame() {
  finishGame();
  startGame();
}

// Когда страница будет полностью загружена, вызывается функция initializeGame
window.addEventListener('load', () => {
  initializeGame();
  startGame();
});

// Создаем ячейки на игровом поле
// for (let i = 0; i < 9; i++) {
//   const cell = document.createElement("div");
//   cell.classList.add("cell");
//   cells.push(cell);
//   board.appendChild(cell);

//   // Обработчик клика по ячейке
//   cell.addEventListener("click", () => {
//     if (cell.textContent === "" && currentPlayer === "X" && !gameOver) {
//       cell.textContent = currentPlayer;
//       cell.style.cursor = "not-allowed";

//       if (checkWin(currentPlayer)) {
//         alert("Игрок " + currentPlayer + " победил!");
//         gameOver = true;
//       } else if (checkDraw()) {
//         alert("Ничья!");
//         gameOver = true;
//       } else {
//         currentPlayer = "O";
//         setTimeout(makeBotMove, 500);
//       }
//     }
//   });
// }


