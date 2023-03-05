import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  gameStatus: "not started",
  cells: [],
  rows: 16,
  cols: 16,
  mines: 40,
  seconds: 0,
};

const boardSlice = createSlice({
  name: "board",
  initialState,
  reducers: {
    createCells(state, action) {
      state.cells = [];

      for (let row = 0; row < state.rows; row++) {
        state.cells.push([]);
        for (let col = 0; col < state.cols; col++) {
          state.cells[row].push({
            isBomb: false,
            isVisible: false,
            isFlag: false,
            isQuestionMark: false,
            value: 0,
          });
        }
      }
    },
    createBombs(state, action) {
      const { row, col } = action.payload;

      let flag = true;
      while (flag) {
        let mines = 0;
        state.cells = [];

        for (let row = 0; row < state.rows; row++) {
          state.cells.push([]);
          for (let col = 0; col < state.cols; col++) {
            state.cells[row].push({
              isBomb: false,
              isVisible: false,
              isFlag: false,
              isQuestionMark: false,

              value: 0,
            });
          }
        }
        while (mines < state.mines) {
          const selectedRow = Math.floor(Math.random() * state.rows);
          const selectedCol = Math.floor(Math.random() * state.cols);

          const curCell = state.cells[selectedRow][selectedCol];
          if (!curCell.isBomb) {
            state.cells = state.cells.map((row, rowId) =>
              row.map((cell, colId) => {
                if (selectedRow === rowId && selectedCol === colId) {
                  return {
                    ...cell,
                    isBomb: true,
                    value: -1,
                  };
                }
                return cell;
              })
            );
            mines++;
          }
        }
        if (!state.cells[row][col].isBomb) flag = false;
      }
      for (let row = 0; row < state.rows; row++) {
        for (let col = 0; col < state.cols; col++) {
          let value = 0;
          const curCell = state.cells[row][col];

          if (!curCell.isBomb) {
            if (row > 0 && col > 0 && state.cells[row - 1][col - 1].isBomb) {
              value++;
            }
            if (
              row < state.rows - 1 &&
              col < state.cols - 1 &&
              state.cells[row + 1][col + 1].isBomb
            ) {
              value++;
            }
            if (row > 0 && state.cells[row - 1][col].isBomb) {
              value++;
            }
            if (col > 0 && state.cells[row][col - 1].isBomb) {
              value++;
            }
            if (
              row > 0 &&
              col < state.cols - 1 &&
              state.cells[row - 1][col + 1].isBomb
            ) {
              value++;
            }
            if (
              row < state.rows - 1 &&
              col > 0 &&
              state.cells[row + 1][col - 1].isBomb
            ) {
              value++;
            }
            if (col < state.cols - 1 && state.cells[row][col + 1].isBomb) {
              value++;
            }
            if (row < state.rows - 1 && state.cells[row + 1][col].isBomb) {
              value++;
            }

            if (value > 0) {
              state.cells[row][col] = {
                ...curCell,
                value,
              };
            }
          }
        }
      }
    },
    gameStatusHandler(state, action) {
      state.gameStatus = action.payload;
      if (state.gameStatus === "resetting") state.mines = 40;
    },
    replaceFlag(state, action) {
      let { selectedRow, selectedCol, isFlag, isQuestionMark } = action.payload;

      if (state.mines > 0 && !isFlag && !isQuestionMark) {
        state.mines--;

        state.cells = state.cells.map((row, rowId) =>
          row.map((cell, colId) => {
            if (selectedRow === rowId && selectedCol === colId) {
              return {
                ...cell,
                isFlag: true,
                isQuestionMark: false,
              };
            }
            return cell;
          })
        );
      } else if (isFlag && !isQuestionMark) {
        state.mines++;
        state.cells = state.cells.map((row, rowId) =>
          row.map((cell, colId) => {
            if (selectedRow === rowId && selectedCol === colId) {
              return {
                ...cell,
                isFlag: false,
                isQuestionMark: true,
              };
            }
            return cell;
          })
        );
      } else if (!isFlag && isQuestionMark) {
        state.cells = state.cells.map((row, rowId) =>
          row.map((cell, colId) => {
            if (selectedRow === rowId && selectedCol === colId) {
              return {
                ...cell,
                isFlag: false,
                isQuestionMark: false,
              };
            }
            return cell;
          })
        );
      }
    },
    replaceCells(state, action) {
      state.cells = action.payload;
    },
    showCells(state, action) {
      const { explodedRow, explodedCol } = action.payload;
      state.cells = state.cells.map((row, rowId) =>
        row.map((cell, colId) => {
          const curCell = state.cells[rowId][colId];
          if (explodedRow === rowId && explodedCol === colId) {
            return {
              ...cell,
              isFlag: false,
              isQuestionMark: false,
              exploded: true,
            };
          }
          if (curCell.isBomb) {
            return {
              ...cell,
              isVisible: true,
            };
          }
          return cell;
        })
      );
    },
    winHandler(state, action) {
      let flag = true;
      for (let row = 0; row < state.rows; row++) {
        for (let col = 0; col < state.cols; col++) {
          const curCell = state.cells[row][col];

          if (!curCell.isBomb && !curCell.isVisible) {
            flag = false;
            break;
          }
        }
      }

      if (flag) {
        state.gameStatus = "win";

        state.cells = state.cells.map((row, rowId) =>
          row.map((cell, colId) => {
            const curCell = state.cells[rowId][colId];
            if ((curCell.isBomb && curCell.isQuestionMark) || curCell.isBomb) {
              return {
                ...cell,
                isBomb: false,
                isQuestionMark: false,
                isFlag: true,
              };
            }
            return cell;
          })
        );
      }
    },
  },
});

export const boardActions = boardSlice.actions;

export default boardSlice;
