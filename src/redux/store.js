import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./authSlice";
import publicTodosReducer from "./publicTodosSlice";
import privateTodosReducer from "./privateTodosSlice";

const store = configureStore({
  reducer: {
    auth: authReducer,
    publicTodos: publicTodosReducer,
    privateTodos: privateTodosReducer,
  },
});
export default store;
