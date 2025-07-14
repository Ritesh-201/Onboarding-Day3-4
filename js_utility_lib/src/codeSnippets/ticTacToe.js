// Tic-Tac-Toe game class
export class TicTacToeGame {
  constructor() {
    this.board = Array(9).fill('');
    this.currentPlayer = 'X';
    this.gameActive = true;
    this.score = { X: 0, O: 0, draws: 0 };
    this.winPatterns = [
      [0, 1, 2], [3, 4, 5], [6, 7, 8], // rows
      [0, 3, 6], [1, 4, 7], [2, 5, 8], // columns
      [0, 4, 8], [2, 4, 6] // diagonals
    ];
  }

  init() {
    this.renderBoard();
    this.updateDisplay(`Player ${this.currentPlayer}'s turn`);
    this.updateScore();
  }

  makeMove(cellIndex) {
    if (this.board[cellIndex] !== '' || !this.gameActive) return false;
    
    this.board[cellIndex] = this.currentPlayer;
    
    if (this.checkWinner()) {
      this.gameActive = false;
      this.score[this.currentPlayer]++;
      this.updateDisplay(`Player ${this.currentPlayer} wins!`);
    } else if (this.board.every(cell => cell !== '')) {
      this.gameActive = false;
      this.score.draws++;
      this.updateDisplay("It's a draw!");
    } else {
      this.currentPlayer = this.currentPlayer === 'X' ? 'O' : 'X';
      this.updateDisplay(`Player ${this.currentPlayer}'s turn`);
    }
    
    this.renderBoard();
    this.updateScore();
    return true;
  }

  checkWinner() {
    return this.winPatterns.some(pattern => {
      const [a, b, c] = pattern;
      return this.board[a] && 
             this.board[a] === this.board[b] && 
             this.board[a] === this.board[c];
    });
  }

  resetGame() {
    this.board = Array(9).fill('');
    this.currentPlayer = 'X';
    this.gameActive = true;
    this.renderBoard();
    this.updateDisplay(`Player ${this.currentPlayer}'s turn`);
  }

  resetScore() {
    this.score = { X: 0, O: 0, draws: 0 };
    this.updateScore();
  }

  renderBoard() {
    const cells = document.querySelectorAll('.cell');
    cells.forEach((cell, index) => {
      cell.textContent = this.board[index];
      cell.className = 'cell' + (this.board[index] ? ' filled' : '');
    });
  }

  updateDisplay(message) {
    const gameStatus = document.getElementById('game-status');
    const currentPlayerElement = document.getElementById('current-player');
    
    if (gameStatus) gameStatus.textContent = message;
    if (currentPlayerElement) currentPlayerElement.textContent = this.currentPlayer;
  }

  updateScore() {
    const scoreX = document.getElementById('score-x');
    const scoreO = document.getElementById('score-o');
    const scoreDraw = document.getElementById('score-draw');
    
    if (scoreX) scoreX.textContent = this.score.X;
    if (scoreO) scoreO.textContent = this.score.O;
    if (scoreDraw) scoreDraw.textContent = this.score.draws;
  }
}