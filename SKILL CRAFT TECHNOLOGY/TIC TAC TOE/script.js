const board = document.getElementById('board');
const statusText = document.getElementById('status');
let cells = [];
let currentPlayer = 'X';
let gameActive = true;

const winningCombinations = [
  [0,1,2], [3,4,5], [6,7,8],  // Rows
  [0,3,6], [1,4,7], [2,5,8],  // Columns
  [0,4,8], [2,4,6]            // Diagonals
];

function createBoard() {
  board.innerHTML = '';
  cells = [];

  for (let i = 0; i < 9; i++) {
    const cell = document.createElement('div');
    cell.classList = 'w-32 h-32 flex items-center justify-center text-6xl font-extrabold text-gray-800 bg-gray-100 rounded-xl cursor-pointer hover:bg-gray-200';
    cell.addEventListener('click', () => handleCellClick(i));
    board.appendChild(cell);
    cells.push(cell);
  }

  statusText.textContent = `Player ${currentPlayer}'s turn`;
}



function handleCellClick(index) {
  if (!gameActive || cells[index].textContent !== '') return;

  cells[index].textContent = currentPlayer;
  if (checkWin()) {
    statusText.textContent = `Player ${currentPlayer} Wins!`;
    gameActive = false;
    highlightWinningCells();
    return;
  }

  if (cells.every(cell => cell.textContent !== '')) {
    statusText.textContent = 'It\'s a Draw!';
    gameActive = false;
    return;
  }

  currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
  statusText.textContent = `Player ${currentPlayer}'s turn`;
}

function checkWin() {
  return winningCombinations.some(combo => {
    return combo.every(index => cells[index].textContent === currentPlayer);
  });
}

function highlightWinningCells() {
  winningCombinations.forEach(combo => {
    if (combo.every(index => cells[index].textContent === currentPlayer)) {
      combo.forEach(index => {
        cells[index].classList.add('bg-green-400', 'text-white');
      });
    }
  });
}

function resetGame() {
  currentPlayer = 'X';
  gameActive = true;
  createBoard();
}

createBoard();
