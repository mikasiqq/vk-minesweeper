import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { boardActions } from "../store/reducers/board-slice";
import classes from "./BoardBody.module.scss";
import Cell from "./Cell";

const BoardBody = () => {
  const cells = useSelector((state) => state.board.cells);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(boardActions.createCells());
  }, []);

  return (
    <div className={classes.boardBody}>
      {cells.map((row, rowId) =>
        row.map((cell, colId) => (
          <Cell
            className={classes.cell}
            key={`${rowId} ${colId}`}
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
