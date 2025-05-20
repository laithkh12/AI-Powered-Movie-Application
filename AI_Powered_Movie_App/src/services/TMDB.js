import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const tmdbApiKey = import.meta.env.VITE_TMDB_KEY;

export const tmdbApi = createApi({
  reducerPath: "tmdbApi",
  baseQuery: fetchBaseQuery({ baseUrl: "https://api.themoviedb.org/3" }),
  endpoints: (builder) => ({
    //Get Genres
    getGenres: builder.query({
      query: () => `/genre/movie/list?api_key=${tmdbApiKey}`,
    }),

    // Get Movies by Type
    getMovies: builder.query({
      query: ({ genreIdOrCategoryName, page, searchQuery }) => {
        // Get Movies by Search
        if (searchQuery) {
          return `/search/movie?query=${searchQuery}&page=${page}&api_key=${tmdbApiKey}`;
        }

        // Get Mvies by Category
        if (
          genreIdOrCategoryName &&
          typeof genreIdOrCategoryName === "string"
        ) {
          return `/movie/${genreIdOrCategoryName}?page=${page}&api_key=${tmdbApiKey}`;
        }

        // Get Mvies by Genre
        if (
          genreIdOrCategoryName &&
          typeof genreIdOrCategoryName === "number"
        ) {
          return `discover/movie?with_genres=${genreIdOrCategoryName}?page=${page}&api_key=${tmdbApiKey}`;
        }

        // Get Popular Movies
        return `/movie/popular?page=${page}&api_key=${tmdbApiKey}`;
      },
    }),

    // Get Movies Details
    getMovie: builder.query({
      query: (id) =>
        `/movie/${id}?append_to_response=videos,credits&api_key=${tmdbApiKey}`,
    }),

    // Get Recommended Movies
    getRecommendations: builder.query({
      query: ({ movie_id, list }) =>
        `/movie/${movie_id}/${list}?api_key=${tmdbApiKey}`,
    }),

    // Get Actor Details
    getActorDetails: builder.query({
      query: (id) => `/person/${id}?api_key=${tmdbApiKey}`,
    }),

    // Get Actor Movie List
    getMoviesByActorId: builder.query({
      query: ({ id, page }) =>
        `/discover/movie?with_cast=${id}&page=${page}&api_key=${tmdbApiKey}`,
    }),

    // Get User Favorite
    getList: builder.query({
      query: ({ listName, accountId, sessionId, page }) =>
        `/account/${accountId}/${listName}?api_key=${tmdbApiKey}&session_id=${sessionId}&page=${page}`,
    }),
  }),
});

export const {
  useGetMoviesQuery,
  useGetGenresQuery,
  useGetMovieQuery,
  useGetRecommendationsQuery,
  useGetActorDetailsQuery,
  useGetMoviesByActorIdQuery,
  useGetListQuery,
} = tmdbApi;
