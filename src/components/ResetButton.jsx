import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { boardActions } from "../store/reducers/board-slice";
import classes from "./ResetButton.module.scss";

const ResetButton = () => {
  const dispatch = useDispatch();
  const gameStatus = useSelector((state) => state.board.gameStatus);
  const [styles, setStyles] = useState(`${classes.resetButton}`);

  useEffect(() => {
    const resetButtonHandler = () => {
      if (gameStatus === "clicking") {
        setStyles(`${classes.clicking}`);
      }
      if (
        gameStatus === "started" ||
        gameStatus === "not started" ||
        gameStatus === "resetting"
      ) {
        setStyles(`${classes.resetButton}`);
      }
      if (gameStatus === "loss") {
        setStyles(`${classes.loss}`);
      }
      if (gameStatus === "win") {
        setStyles(`${classes.win}`);
      }
    };

    resetButtonHandler();
  }, [gameStatus]);

  const gameHandler = () => {
    dispatch(boardActions.gameStatusHandler("resetting"));
    dispatch(boardActions.createCells());
    // dispatch(boardActions.createBombs({ row: 1, col: 1 }));
  };

  return <button onClick={gameHandler} className={styles}></button>;
};

export default ResetButton;
