export const TILE_STATUSES = {
    HIDDEN: 'hidden',
    MINE: 'mine',
    NUMBER: 'number',
    MARKED: 'marked'
};
export function createBoard(boardSize, numberOfMines) {
    const board = [];
    const minePositions = getMinePositions(boardSize, numberOfMines);
    for (let x = 0; x < boardSize; x++) {
        const row = [];
        for (let y = 0; y < boardSize; y++) {
            const element = document.createElement("div");
            element.dataset.status = TILE_STATUSES.HIDDEN;
            const tile = {
                element,
                x,
                y,
                mine: minePositions.some(positionMatch.bind(null, {x, y})), 
                get status() {
                    return element.dataset.status;
                },
                set status(value) {
                    return element.dataset.status = value;
                }
            };
            row.push(tile);
        }
        board.push(row);
    }
    return board;
}

export function markTile(tile) {
    if (tile.status !== TILE_STATUSES.HIDDEN && tile.status !== TILE_STATUSES.MARKED) {
        return;
    }
    if (tile.status === TILE_STATUSES.HIDDEN) {
        tile.status = TILE_STATUSES.MARKED;
    } else {
        tile.status = TILE_STATUSES.HIDDEN;
    }
}

export function revealTile(board, tile) {
    if (tile.status !== TILE_STATUSES.HIDDEN) {
        return;
    }
    if (tile.mine) {
        tile.status = TILE_STATUSES.MINE;
        return;
    }
    tile.status = TILE_STATUSES.NUMBER;
    const adjacentTile = nearByTiles(board, tile);
    const mines = adjacentTile.filter(t => t.mine);
    if (mines.length === 0) {
        adjacentTile.forEach(revealTile.bind(null, board))
    } else {
        tile.element.textContent = mines.length;
    }
}

export function checkWin(board) {
}

export function checkLose(board) {
    return board.some(row => {
        return row.some(tile => {
            return tile.status === TILE_STATUSES.MINE;
        });
    });
}

function getMinePositions(boardSize, numberOfMines) {
    const positions = [];
    while (positions.length < numberOfMines) {
        const position = {
            x: randomNumber(boardSize),
            y: randomNumber(boardSize)
        };
        if (!positions.some(positionMatch.bind(null, position))) {
            positions.push(position);
        }
    }
    return positions;
}

function positionMatch(a, b) {
    return a.x === b.x && a.y === b.y
}

function randomNumber(boardSize) {
    return Math.floor(Math.random() * boardSize);
}

function nearByTiles(board, {x, y}) {
    const tiles = [];
    for (let xOffset = -1; xOffset <= 1; xOffset++) {
        for (let yOffset = -1; yOffset <= 1; yOffset++) {
         const tile = board[x + xOffset]?.[y + yOffset];   
         if (tile) tiles.push(tile);
        }        
    }
    return tiles;
}