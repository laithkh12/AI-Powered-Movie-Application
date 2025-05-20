import { configureStore } from "@reduxjs/toolkit";
import { tmdbApi } from "../services/TMDB";
import currentGenreOrCategory from "../features/currentGenresOrCategory"; // ✅ Corrected import
import userReducer from "../features/auth";

export default configureStore({
  reducer: {
    [tmdbApi.reducerPath]: tmdbApi.reducer,
    currentGenreOrCategory,
    user: userReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(tmdbApi.middleware),
});
