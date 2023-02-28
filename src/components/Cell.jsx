import React from "react";
import classes from "./Cell.module.scss";
const Cell = ({ cell, col, row }) => {
  let styles = "";

  const displayCell = () => {
    if (cell.isVisible) {
      if (cell.isBomb) styles = `${classes.isBomb} `;
      else styles = `${classes.isVisible} `;
    } else if (cell.isFlag) styles = `${classes.isFlag} `;
  };

  const numToDisplay = () => {
    if (cell.isVisible) {
      switch (cell.value.toString()) {
        case "1": {
          styles += `${classes.one}`;
          break;
        }
        case "2": {
          styles += `${classes.two}`;
          break;
        }
        case "3": {
          styles += `${classes.three}`;
          break;
        }
        case "4": {
          styles += `${classes.four}`;
          break;
        }
        case "5": {
          styles += `${classes.five}`;
          break;
        }
        case "6": {
          styles += `${classes.six}`;
          break;
        }
        case "7": {
          styles += `${classes.seven}`;
          break;
        }
        case "8": {
          styles += `${classes.eight}`;
          break;
        }
      }
    }
  };

  displayCell();
  numToDisplay();

  return <button className={`${classes.button} ${styles}`}></button>;
};

export default Cell;
