import { createSlice } from "@reduxjs/toolkit";

let userLanguage = localStorage.getItem("language");
if (!userLanguage) {
  userLanguage = "en";
  localStorage.setItem("language", userLanguage);
}
export const homeSlice = createSlice({
  name: "home",
  initialState: {
    url: {},
    genres: {},
    allLanguage: [],
    language: userLanguage,
  },
  reducers: {
    getApiConfiguration: (state, action) => {
      state.url = action.payload;
    },
    getGenres: (state, action) => {
      state.genres = action.payload;
    },
    getAllLanguage: (state, action) => {
      state.language = action.payload;
    },
    getLanguage: (state, action) => {
      state.language = action.payload;
      localStorage.setItem("language", action.payload);
    },
  },
});

export const { getApiConfiguration, getGenres, getAllLanguage, getLanguage } =
  homeSlice.actions;
export default homeSlice.reducer;
