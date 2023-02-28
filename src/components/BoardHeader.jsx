import React from "react";
import classes from "./BoardHeader.module.scss";
import Display from "./Display";
import ResetButton from "./ResetButton";

const BoardHeader = () => {
  return (
    <div className={classes.boardHeader}>
      <Display type="mines" />
      <ResetButton />
      <Display type="seconds" />
    </div>
  );
};

export default BoardHeader;
