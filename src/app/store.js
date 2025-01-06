import { configureStore } from "@reduxjs/toolkit";
import studentReducer from "./student/studentSlice";

// configure store
const store = configureStore({
  reducer: {
    students: studentReducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware(),
  devTools: true,
});

// export default
export default store;
