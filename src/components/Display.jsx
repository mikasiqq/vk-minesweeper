import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import classes from "./Display.module.scss";

const Display = ({ type }) => {
  const gameStatus = useSelector((state) => state.board.gameStatus);

  const mines = useSelector((state) => state.board.mines);
  const seconds = useSelector((state) => state.board.seconds);

  const val = type === "seconds" ? seconds : mines;
  const [value, setValue] = useState(val);
  const [styles, setStyles] = useState([]);
  const [status, setStatus] = useState("");

  let timer;

  useEffect(() => {
    if (status === "resetting" && type === "seconds") {
      setValue(val);
      console.log(val, "val");
    } else if (status === "resetting" && type === "mines") setValue(40);
    else if (type === "seconds" && value < 999) {
      console.log("timer", value);
      timer = setInterval(() => {
        setValue(value + 1);
      }, 1000);
      return () => {
        clearInterval(timer);
      };
    } else if (type === "mines") {
      setValue(val);
    }
  }, [value, val, status]);

  useEffect(() => {
    const numToDisplay = () => {
      let k = 0;
      const valueString = value.toString().padStart(3, "0");
      const updatedStyles = [];

      while (k < valueString.length) {
        switch (valueString[k]) {
          case "0": {
            updatedStyles.push(`${classes.zero}`);
            break;
          }
          case "1": {
            updatedStyles.push(`${classes.one}`);
            break;
          }
          case "2": {
            updatedStyles.push(`${classes.two}`);
            break;
          }
          case "3": {
            updatedStyles.push(`${classes.three}`);
            break;
          }
          case "4": {
            updatedStyles.push(`${classes.four}`);
            break;
          }
          case "5": {
            updatedStyles.push(`${classes.five}`);
            break;
          }
          case "6": {
            updatedStyles.push(`${classes.six}`);
            break;
          }
          case "7": {
            updatedStyles.push(`${classes.seven}`);
            break;
          }
          case "8": {
            updatedStyles.push(`${classes.eight}`);
            break;
          }
          case "9": {
            updatedStyles.push(`${classes.nine}`);
            break;
          }
        }
        k++;
      }
      setStyles(updatedStyles);
    };

    if (gameStatus !== "loss" && gameStatus !== "win") numToDisplay();
    console.log(gameStatus);
    if (gameStatus === "resetting" || gameStatus === "not started")
      setStatus("resetting");
    else setStatus("");
  }, [value, val, gameStatus]);

  return (
    <div className={classes.display}>
      {styles.map((el, index) => (
        <div key={index} className={styles[index]}></div>
      ))}
    </div>
  );
};

export default Display;
