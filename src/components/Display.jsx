import React from "react";
import { useSelector } from "react-redux";
import classes from "./Display.module.scss";

const Display = ({ type }) => {
  let value =
    type === "seconds"
      ? useSelector((state) => state.board.seconds)
      : useSelector((state) => state.board.mines);

  value = value.toString().padStart(3, "0");

  const styles = [];
  const numToDisplay = () => {
    let k = 0;

    while (k < value.length) {
      switch (value[k]) {
        case "0": {
          styles[k] = `${classes.zero}`;
          break;
        }
        case "1": {
          styles[k] = `${classes.one}`;
          break;
        }
        case "2": {
          styles[k] = `${classes.two}`;
          break;
        }
        case "3": {
          styles[k] = `${classes.three}`;
          break;
        }
        case "4": {
          styles[k] = `${classes.four}`;
          break;
        }
        case "5": {
          styles[k] = `${classes.five}`;
          break;
        }
        case "6": {
          styles[k] = `${classes.six}`;
          break;
        }
        case "7": {
          styles[k] = `${classes.seven}`;
          break;
        }
        case "8": {
          styles[k] = `${classes.eight}`;
          break;
        }
        case "9": {
          styles[k] = `${classes.nine}`;
          break;
        }
      }
      k++;
    }
  };
  numToDisplay();

  return (
    <div className={classes.display}>
      {styles.map((el, index) => (
        <div key={`${type} ${value[index]}`} className={styles[index]}></div>
      ))}
    </div>
  );
};

export default Display;
