import alanBtn from "@alan-ai/alan-sdk-web";
import { useContext, useEffect } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { ColorModeContext } from "./utils/ToggleColorMode";
import { fetchToken } from "./utils";
import {
  searchMovie,
  selectGenreOrCategory,
} from "./features/currentGenresOrCategory";

const UseAlan = () => {
  const { setMode } = useContext(ColorModeContext);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    alanBtn({
      key: "key from alan.app",
      host: "v1.alan.app/alanai",
      onCommand: ({ command, mode, genres, genreOrCategory, query }) => {
        if (command === "chooseGenre") {
          const foundGenre = genres.find(
            (g) => g.name.toLowerCase() === genreOrCategory.toLowerCase()
          );

          if (foundGenre) {
            navigate("/");
            dispatch(selectGenreOrCategory(foundGenre.id));
          } else {
            const category = genreOrCategory.startsWith("top")
              ? "top_rated"
              : genreOrCategory;
            navigate("/");
            dispatch(selectGenreOrCategory(category));
          }
        } else if (command === "changeMode") {
          if (mode === "light") {
            setMode("light");
          } else {
            setMode("dark");
          }
        } else if (command === "login") {
          fetchToken();
        } else if (command === "logout") {
          localStorage.clear();
          window.location.href = "/";
        } else if (command === "search") {
          dispatch(searchMovie(query));
        }
      },
    });
  }, [setMode, dispatch, navigate]);

  return null;
};

export default UseAlan;
