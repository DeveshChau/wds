import {createBoard} from './minesweeper.js'
const boardSize = 5;
const numberOfMines = 5;
const board = createBoard(boardSize, numberOfMines);
console.log(board);
const boardElement = document.querySelector('.board');
boardElement.style.setProperty('--size', boardSize)
board.forEach(row => {
    row.forEach(tile => {
        boardElement.append(tile.element);
    })
})