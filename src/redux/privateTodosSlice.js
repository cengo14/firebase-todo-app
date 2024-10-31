import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  privateTodos: [],
};
const privateTodosSlice = createSlice({
  name: "privateTodos",
  initialState,
  reducers: {
    setPrivateTodos: (state, action) => {
      state.privateTodos = action.payload;
    },
    appendPrivateTodos: (state, action) => {
      state.privateTodos = [...state.todos, action.payload];
    },
  },
});
export const { setPrivateTodos, appendPrivateTodos } =
  privateTodosSlice.actions;
export default privateTodosSlice.reducer;
