import { TILE_STATUSES, createBoard, markTile, revealTile, checkWin, checkLose } from './minesweeper.js'
const boardSize = 5;
const numberOfMines = 1;
const board = createBoard(boardSize, numberOfMines);
const boardElement = document.querySelector('.board');
boardElement.style.setProperty('--size', boardSize);
const mineLeft = document.querySelector('[data-mine-left]');
const subText = document.querySelector('.subtext');
board.forEach(row => {
    row.forEach(tile => {
        boardElement.append(tile.element);
        tile.element.addEventListener('click', () => {
            revealTile(board, tile);
            checkEndGame();
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

function checkEndGame() {
    const win = checkWin(board);
    const lose = checkLose(board);
    if (win || lose) {
        boardElement.addEventListener('click', stopProp, {capture: true});
        boardElement.addEventListener('contextmenu', stopProp, {capture: true});
    }
    if (win) {
        subText.textContent = 'You win';
    }
    if (lose) {
        subText.textContent = 'You Lose'
        board.forEach(row => {
            row.forEach(tile => {
                if (tile.status === TILE_STATUSES.MARKED) markTile(tile);
                if (tile.mine) revealTile(board, tile);
            });
        });
    }    
}

function stopProp(e) {
    e.stopPropagation();
}