// src/App.jsx
import React, { useRef } from "react";
import { CssBaseline } from "@mui/material";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Movies from "./components/Movies/Movies";
import Actors from "./components/Actors/Actors";
import Navbar from "./components/Navbar/Navbar";
import MovieInfo from "./components/MovieInfo/MovieInfo";
import Profile from "./components/Profile/Profile";
import useStyles from "./styles";
import UseAlan from "./Alan";

const App = () => {
  const classes = useStyles();
  const alanBtnContainer = useRef();

  return (
    <div className={classes.root}>
      <CssBaseline />
      <BrowserRouter>
        <Navbar />
        <main className={classes.content}>
          <div className={classes.toolbar} />
          <Routes>
            <Route path="/movie/:id" element={<MovieInfo />} />
            <Route path="/" element={<Movies />} />
            <Route path="/approved" element={<Movies />} />
            <Route path="/actors/:id" element={<Actors />} />
            <Route path="/profile/:id" element={<Profile />} />
          </Routes>
        </main>
        <div ref={alanBtnContainer} />
        <UseAlan />
      </BrowserRouter>
    </div>
  );
};

export default App;
