import { createBoard, markTile } from './minesweeper.js'
const boardSize = 5;
const numberOfMines = 5;
const board = createBoard(boardSize, numberOfMines);
console.log(board);
const boardElement = document.querySelector('.board');
boardElement.style.setProperty('--size', boardSize);
const mineLeft = document.querySelector('[data-mine-left]');
board.forEach(row => {
    row.forEach(tile => {
        boardElement.append(tile.element);
        tile.element.addEventListener('click', () => {});
        tile.element.addEventListener('contextmenu', e => {
            e.preventDefault();
            markTile(tile);
        });
    });
});
mineLeft.textContent = numberOfMines;