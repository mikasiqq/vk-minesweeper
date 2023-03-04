import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { boardActions } from "../store/reducers/board-slice";
import classes from "./Cell.module.scss";

const Cell = ({ cell, col, row, cells }) => {
  const gameStatus = useSelector((state) => state.board.gameStatus);
  const dispatch = useDispatch();

  const [styles, setStyles] = useState(`${classes.button}`);

  let { isBomb, isFlag, isQuestionMark, isVisible, value } = cell;

  const displayCell = () => {
    if (cell.isQuestionMark) setStyles(`${classes.isQuestionMark}`);
    else if (cell.exploded) setStyles(`${classes.exploded}`);
    else if (isVisible) {
      if (isBomb) setStyles(`${classes.isBomb} `);
      if (value === 0) setStyles(`${classes.isVisible} `);
    } else if (isFlag) {
      setStyles(`${classes.isFlag} `);
    } else setStyles(`${classes.button} `);
  };

  useEffect(() => {
    displayCell();
    const numToDisplay = () => {
      if (isVisible) {
        switch (value.toString()) {
          case "1": {
            setStyles(`${classes.one}`);
            break;
          }
          case "2": {
            setStyles(`${classes.two}`);
            break;
          }
          case "3": {
            setStyles(`${classes.three}`);
            break;
          }
          case "4": {
            setStyles(`${classes.four}`);
            break;
          }
          case "5": {
            setStyles(`${classes.five}`);
            break;
          }
          case "6": {
            setStyles(`${classes.six}`);
            break;
          }
          case "7": {
            setStyles(`${classes.seven}`);
            break;
          }
          case "8": {
            setStyles(`${classes.eight}`);
            break;
          }
        }
      }
    };

    numToDisplay();
  }, [isVisible, isBomb, isFlag, cells]);

  const openCell = (selectedCol, selectedRow) => {
    let updatedCells = [...cells];
    updatedCells = cells.map((row, rowId) =>
      row.map((cell, colId) => {
        if (selectedRow === rowId && selectedCol === colId) {
          return {
            ...cell,
            isVisible: true,
          };
        }
        return cell;
      })
    );
    cells = updatedCells;
    dispatch(boardActions.replaceCells(updatedCells));
    displayCell();
  };

  const openAdjacent = (cellRow, cellCol) => {
    openCell(cellCol, cellRow);

    const topLeftCell =
      cellRow > 0 && cellCol > 0 ? cells[cellRow - 1][cellCol - 1] : null;
    const topCell = cellRow > 0 ? cells[cellRow - 1][cellCol] : null;
    const topRightCell =
      cellRow > 0 && cellCol < 15 ? cells[cellRow - 1][cellCol + 1] : null;
    const leftCell = cellCol > 0 ? cells[cellRow][cellCol - 1] : null;
    const rightCell = cellCol < 15 ? cells[cellRow][cellCol + 1] : null;
    const bottomLeftCell =
      cellRow < 15 && cellCol > 0 ? cells[cellRow + 1][cellCol - 1] : null;
    const bottomCell = cellRow < 15 ? cells[cellRow + 1][cellCol] : null;
    const bottomRightCell =
      cellRow < 15 && cellCol < 15 ? cells[cellRow + 1][cellCol + 1] : null;

    if (topLeftCell && !topLeftCell.isVisible) {
      if (topLeftCell.value === 0) {
        openAdjacent(cellRow - 1, cellCol - 1);
      } else if (topLeftCell.value > 0) openCell(cellCol - 1, cellRow - 1);
    }
    if (topCell && !topCell.isVisible) {
      if (topCell.value === 0) {
        openAdjacent(cellRow - 1, cellCol);
      } else if (topCell.value > 0) openCell(cellCol, cellRow - 1);
    }
    if (topRightCell && !topRightCell.isVisible) {
      if (topRightCell.value === 0) {
        openAdjacent(cellRow - 1, cellCol + 1);
      } else if (topRightCell.value > 0) openCell(cellCol + 1, cellRow - 1);
    }
    if (leftCell && !leftCell.isVisible) {
      if (leftCell.value === 0) {
        openAdjacent(cellRow, cellCol - 1);
      } else if (leftCell.value > 0) openCell(cellCol - 1, cellRow);
    }

    if (rightCell && !rightCell.isVisible) {
      if (rightCell.value === 0) {
        openAdjacent(cellRow, cellCol + 1);
      } else if (rightCell.value > 0) openCell(cellCol + 1, cellRow);
    }

    if (bottomLeftCell && !bottomLeftCell.isVisible) {
      if (bottomLeftCell.value === 0) {
        openAdjacent(cellRow + 1, cellCol - 1);
      } else if (bottomLeftCell.value > 0) openCell(cellCol - 1, cellRow + 1);
    }

    if (bottomCell && !bottomCell.isVisible) {
      if (bottomCell.value === 0) {
        openAdjacent(cellRow + 1, cellCol);
      } else if (bottomCell.value > 0) openCell(cellCol, cellRow + 1);
    }

    if (bottomRightCell && !bottomRightCell.isVisible) {
      if (bottomRightCell.value === 0) {
        openAdjacent(cellRow + 1, cellCol + 1);
      } else if (bottomRightCell.value > 0) openCell(cellCol + 1, cellRow + 1);
    }
  };

  const clickHandler = () => {
    if (gameStatus === "loss" || gameStatus === "win") return;

    if (gameStatus === "not started") {
      dispatch(boardActions.gameStatusHandler("started"));
    }

    if (isBomb) {
      dispatch(boardActions.showCells({ explodedRow: row, explodedCol: col }));
      dispatch(boardActions.gameStatusHandler("loss"));
    }

    if (!isVisible && !isFlag && value > 0) openCell(col, row);

    if (!isVisible && !isFlag && value === 0) {
      openAdjacent(row, col);
    }
    dispatch(boardActions.winHandler());

    displayCell();
  };

  const contextMenuHandler = (event) => {
    event.preventDefault();

    if (!isVisible) {
      dispatch(
        boardActions.replaceFlag({
          selectedCol: col,
          selectedRow: row,
          isFlag,
          isQuestionMark,
        })
      );
    }

    displayCell();
  };

  return (
    <button
      onClick={clickHandler}
      onContextMenu={contextMenuHandler}
      onMouseDown={() => {
        if (gameStatus !== "loss" && gameStatus !== "win") {
          if (gameStatus === "not started" || gameStatus === "resetting") {
            dispatch(boardActions.createBombs({ row, col }));
          }
          dispatch(boardActions.gameStatusHandler("clicking"));
        }
      }}
      onMouseUp={() => {
        if (gameStatus !== "loss" && gameStatus !== "win")
          dispatch(boardActions.gameStatusHandler("started"));
      }}
      className={styles}
    ></button>
  );
};

export default Cell;
