import { configureStore } from "@reduxjs/toolkit";
import boardSlice from "./reducers/board-slice";

const store = configureStore({
  reducer: {
    board: boardSlice.reducer,
  },
});

export default store;
