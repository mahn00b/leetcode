/**
 * @param {character[][]} board
 * @return {boolean}
 */
var isValidSudoku = function(board) {
    const cols = new Array(9).fill(null);
    const rows = new Array(9).fill(null);
    const grids = new Array(9).fill(null);

    const identifyGrid = (row, col) => {
        const r = Math.floor(row / 3)
        const c = Math.floor(col / 3)

        return (r * 3) + c;
    }


    for (let i = 0; i < 9; i++) {
        for (let j = 0; j < 9; j++) {
            let cell = board[i][j];

            if (cell === '.') continue;

            // convert to int
            cell = +cell

            if (!cols[j]) {
                cols[j] = new Array(9).fill(false);
            } else if (cols[j][cell - 1] === true) {
                 return false;
            }

            cols[j][cell - 1] = true;

            if (!rows[i]) {
                rows[i] = new Array(9).fill(false);
            } else if (rows[i][cell - 1] === true) {
                 return false
            }
            rows[i][cell - 1] = true;

            const grid = identifyGrid(i, j);

            if (!grids[grid]) {
                grids[grid] = new Array(9).fill(false);
            } else if (grids[grid][cell - 1] === true) {
                return false
            }

            grids[grid][cell - 1] = true;
        }
    }

    return true;
};