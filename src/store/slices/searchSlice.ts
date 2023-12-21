import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { fetchPokemon } from "../thunks/fetchPokemon";

export interface SearchState {
  history: any[];
}

const initialState: SearchState = {
  history: [],
};

// const searchSlice = createSlice({
//   name: "search",
//   initialState,
//   // extraReducers: (builder) => {
//   //   builder.addCase(
//   //     fetchPokemon.fulfilled,
//   //     (state, action: PayloadAction<any>) => {
//   //       state.history = [...state.history, action.payload];
//   //     }
//   //   );
//   // },
//   reducers: {},
// });

// // export const { addSearchHistory } = searchSlice.actions;
// export const searchReducer = searchSlice.reducer;
