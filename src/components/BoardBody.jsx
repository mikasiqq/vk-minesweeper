import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { boardActions } from "../store/reducers/board-slice";
import classes from "./BoardBody.module.scss";
import Cell from "./Cell";

const BoardBody = () => {
  const cells = useSelector((state) => state.board.cells);
  const gameStatus = useSelector((state) => state.board.gameStatus);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(boardActions.createCells());
  }, []);

  return (
    <div className={`${classes.boardBody} board`}>
      {cells.map((row, rowId) =>
        row.map((cell, colId) => (
          <Cell
            className={classes.cell}
            key={`${rowId} ${colId}`}
            cells={cells}
            cell={cell}
            row={rowId}
            col={colId}
          />
        ))
      )}
    </div>
  );
};

export default BoardBody;
