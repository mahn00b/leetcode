# Valid Sodoku (36)
[Leetcode Link](https://leetcode.com/problems/valid-sudoku)

## Restating Problem
---------------------------------------------------------

A [Sudoku board](https://en.wikipedia.org/wiki/Sudoku) is made up of `9` rows, `9` columns, `9` sub-grids. Every row, column, and sub-grid should have a unique set of numbers such that each of the cells should contain a number between `1` and `9`.

Given a partially filled sudoku board, validate the existing cells such that each row, columns, and sub-grid does not have duplicate entries

## Solution
------------

#### Intuition

The problem has actually been simplified due to the fact that we only need to validate the existing cells. Since there are a fixed number of rows, columns, and sub-grids, we can use 2D arrays to map each unique value.

The most challenging part of the problem is identifying each cell's respective sub-grid. However, we can use the row & column values of the cell. Since a sudoko grid is made up of 3 rows & 3 columns, we can use integer division to determine which cell belongs to which sub-grid.

```
If we number each sub-grid from left to right, starting from 0, then we can get
a corresponding array index to track

| 0 | 1 | 2 |
| 3 | 4 | 5 |
| 6 | 7 | 8 |
(subgrids so each of these correspond to 3 rows & 3 columns)

If we re-conceptualize this as coordniates, then it starts to follow the order of
the board's indexes.

    0   1   2
0 | 0 | 1 | 2 |
1 | 3 | 4 | 5 |
2 | 6 | 7 | 8 |

```


Looking at the grids we defined above, you'll notice that the sub-grid rows `[0 , 1, 2]` correspond to the parent grid's rows `[0-2, 3-5, 6-8]`, respectively. This is the same with the relationship between the parent grid's columns and each sub-grid's columns.

Thus, we can surmise that dividing each parent grid's row & column by `3`, will give us the corresponding sub-grid coordinate.

If we combine these values, we can find the corresponding sub-grid index. After getting the sub-grid row, we can then multiply it by `3`, to get the number of cells in previous cells. If we then add the corresponding grid coordinate, then we can get an offset to cell count that gives us the indices we defined for each sub-grid!
#### Approach

1. Initialize the first dimension of our 2D arrays, `cols`, `rows`, `grids` to track our numbers.
2. Create a function to calculate the respective grid of any `cell` as discussed in the previous section.
3. Create a nested for loop to iterate through the board.
4. For each cell:
	1. determine whether or not this is a filled cell, if not, `continue`
	2. For each corresponding `row`, `col`, and `subgrid` check our arrays and:
		1. Create a new array if it doesn't exist, to track the numbers we've found. Initialize all the elements to `false`.
		2. If it does exist, check if we've found that number already. If so, return the entire function as `false` to invalidate the input
		3. If the array does exist & the cell number hasn't been found yet, then we can set it to `true`
5. If the loop terminates, we know we haven't found any duplicates or else the loop would've ended earlier. We can safely return `true`.

#### Code

```js
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


```

#### Complexity

Runtime:  O(1) (since cells are a fixed number)

Memory: O(1)

## Results
----------

Runtime: 9 ms, faster than 29.67% of JavaScript online submissions for Valid Sudoku.

Memory Usage: 52 MB, less than 67.91% of JavaScript online submissions for Valid Sudoku.