import { TILE_STATUSES, createBoard, markTile, revealTile } from './minesweeper.js'
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
        tile.element.addEventListener('click', () => {
            revealTile(board, tile);
        });
        tile.element.addEventListener('contextmenu', e => {
            e.preventDefault();
            markTile(tile);
            updateMineLeft();
        });
    });
});
mineLeft.textContent = numberOfMines;

function updateMineLeft() {
    const markedTileCount = board.reduce((count, row) => {
        return (count + row.filter(tile => tile.status === TILE_STATUSES.MARKED).length);
    }, 0);
    mineLeft.textContent = numberOfMines - markedTileCount; 
}