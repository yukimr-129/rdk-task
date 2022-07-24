import { combineReducers, configureStore } from "@reduxjs/toolkit";
import counterReducer from "../features/counter/counterSlice";
import loginReducer from "../features/login/loginSlice";
import TaskReducer from "../features/task/taskSlice";

const reducers = combineReducers({
  counter: counterReducer,
  login: loginReducer,
  task: TaskReducer,
});

export const store = configureStore({
  reducer: {
    counter: counterReducer,
    login: loginReducer,
    task: TaskReducer,
  },
});
