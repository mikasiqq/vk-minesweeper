import { createSlice } from "@reduxjs/toolkit";

const initialState = { cells: [], rows: 16, cols: 16, mines: 40, seconds: 0 };

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
            value: -1,
          });
        }
      }

      let mines = 0;
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
                };
              }
              return cell;
            })
          );
          mines++;
        }
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
  },
});

export const boardActions = boardSlice.actions;

export default boardSlice;
