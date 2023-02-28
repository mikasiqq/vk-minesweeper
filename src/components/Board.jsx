import React from "react";
import classes from "./Board.module.scss";
import BoardBody from "./BoardBody";
import BoardHeader from "./BoardHeader";

const Board = () => {
  return (
    <div className={classes.board}>
      <BoardHeader />
      <BoardBody />
    </div>
  );
};

export default Board;
