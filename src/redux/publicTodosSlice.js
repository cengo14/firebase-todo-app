import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  publicTodos: [],
};
const publicTodosSlice = createSlice({
  name: "todos",
  initialState,
  reducers: {
    setPublicTodos: (state, action) => {
      state.publicTodos = action.payload;
    },
    appendPublicTodos: (state, action) => {
      state.publicTodos = [...state.todos, action.payload];
    },
  },
});
export const { setPublicTodos, appendPublicTodos } = publicTodosSlice.actions;
export default publicTodosSlice.reducer;
