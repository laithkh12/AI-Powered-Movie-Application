import React, { useState } from "react";
import { Search as SearchIcon } from "@mui/icons-material";
import { TextField, InputAdornment } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import useStyles from "./searchStyles";
import { searchMovie } from "../../features/currentGenresOrCategory";
import { useLocation } from "react-router-dom";

const Search = () => {
  const classes = useStyles();
  const [query, setQuery] = useState("");
  const dispatch = useDispatch();
  const location = useLocation();

  const handleKeyPress = (event) => {
    if (event.key === "Enter") {
      dispatch(searchMovie(query));
    }
  };

  if (location.pathname !== "/") {
    return null;
  }

  return (
    <div className={classes.searchContainer}>
      <TextField
        onKeyPress={handleKeyPress}
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        variant="standard"
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <SearchIcon />
            </InputAdornment>
          ),
          classes: { input: classes.input },
        }}
      />
    </div>
  );
};

export default Search;
