import React, { useEffect, useState } from "react";
import {
  Modal,
  Typography,
  Button,
  ButtonGroup,
  Grid,
  Box,
  CircularProgress,
  Rating,
} from "@mui/material";
import {
  Movie as MovieIcon,
  Theaters,
  Language,
  PlusOne,
  Favorite,
  FavoriteBorderOutlined,
  Remove,
  ArrowBack,
} from "@mui/icons-material";
import { Link, useParams } from "react-router-dom";
import {
  useGetListQuery,
  useGetMovieQuery,
  useGetRecommendationsQuery,
} from "../../services/TMDB";
import useStyles from "./infoStyles";
import genreIcons from "../../assets/genres";
import { useDispatch, useSelector } from "react-redux";
import { selectGenreOrCategory } from "../../features/currentGenresOrCategory";
import MovieList from "../MovieList/MovieList";
import axios from "axios";
import { userSelector } from "../../features/auth";

const MovieInfo = () => {
  const { user } = useSelector(userSelector);
  const { id } = useParams();
  const { data, isFetching, error } = useGetMovieQuery(id);
  const { data: recommendations } = useGetRecommendationsQuery({
    movie_id: id,
    list: "recommendations",
  });
  const classes = useStyles();
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);

  const [isMovieFavorited, setIsMovieFavorited] = useState(false);
  const [isMovieWatchlisted, setIsMovieWatchlisted] = useState(false);

  const apiKey = import.meta.env.VITE_TMDB_KEY;

  // ✅ Get favorites and watchlist movies before using them
  const { data: favoriteMovies } = useGetListQuery({
    listName: "favorite/movies",
    accountId: user.id,
    sessionId: localStorage.getItem("session_id"),
    page: 1,
  });

  const { data: watchlistMovies } = useGetListQuery({
    listName: "watchlist/movies",
    accountId: user.id,
    sessionId: localStorage.getItem("session_id"),
    page: 1,
  });

  useEffect(() => {
    setIsMovieFavorited(
      !!favoriteMovies?.results?.find((movie) => movie?.id === data?.id)
    );
  }, [favoriteMovies, data]);

  useEffect(() => {
    setIsMovieWatchlisted(
      !!watchlistMovies?.results?.find((movie) => movie?.id === data?.id)
    );
  }, [watchlistMovies, data]);

  const addToFavorites = async () => {
    await axios.post(
      `https://api.themoviedb.org/3/account/${
        user.id
      }/favorite?api_key=${apiKey}&session_id=${localStorage.getItem(
        "session_id"
      )}`,
      {
        media_type: "movie",
        media_id: id,
        favorite: !isMovieFavorited,
      }
    );
    setIsMovieFavorited((prev) => !prev);
  };

  const addToWatchlist = async () => {
    await axios.post(
      `https://api.themoviedb.org/3/account/${
        user.id
      }/watchlist?api_key=${apiKey}&session_id=${localStorage.getItem(
        "session_id"
      )}`,
      {
        media_type: "movie",
        media_id: id,
        watchlist: !isMovieWatchlisted,
      }
    );
    setIsMovieWatchlisted((prev) => !prev);
  };

  if (isFetching) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center">
        <CircularProgress size="8rem" />
      </Box>
    );
  }

  if (error) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center">
        <Link to="/">Something went wrong - Go Back</Link>
      </Box>
    );
  }

  return (
    <Grid
      container
      className={classes.containerSpaceAround}
      columns={12}
      spacing={2}
    >
      <Grid lg={4} sm={12} style={{ display: "flex", marginBottom: "30px" }}>
        <img
          className={classes.poster}
          src={`https://image.tmdb.org/t/p/w500/${data?.poster_path}`}
          alt="poster"
        />
      </Grid>

      <Grid lg={7} sm={12} container direction="column">
        <Typography variant="h4" align="center" gutterBottom>
          {data?.title} ({data?.release_date.split("-")[0]})
        </Typography>

        <Typography variant="h5" align="center" gutterBottom>
          {data?.tagline}
        </Typography>

        <Grid className={classes.containerSpaceAround}>
          <Box display="flex" alignItems="center">
            <Rating readOnly value={data?.vote_average / 2} />
            <Typography variant="subtitle1" style={{ marginLeft: "10px" }}>
              {Math.floor(data?.vote_average)} / 10
            </Typography>
          </Box>

          <Typography align="center">
            {data?.runtime} min | Language: {data?.spoken_languages[0].name}
          </Typography>
        </Grid>

        <Grid className={classes.genresContainer}>
          {data?.genres?.map((genre) => (
            <Link
              key={genre.name}
              className={classes.links}
              to="/"
              onClick={() => dispatch(selectGenreOrCategory(genre.id))}
            >
              <img
                src={genreIcons[genre.name.toLowerCase()]}
                alt={genre.name}
                className={classes.genreImage}
                height={30}
              />
              <Typography color="textPrimary" variant="subtitle1">
                {genre?.name}
              </Typography>
            </Link>
          ))}
        </Grid>

        <Typography variant="h5" gutterBottom style={{ marginTop: "10px" }}>
          Overview
        </Typography>

        <Typography style={{ marginBottom: "2rem" }}>
          {data?.overview}
        </Typography>

        <Typography variant="h5" gutterBottom>
          Top Cast
        </Typography>

        <Grid container spacing={2} columns={12}>
          {data?.credits.cast
            .filter((c) => c.profile_path)
            .slice(0, 6)
            .map((character, i) => (
              <Grid
                key={i}
                xs={4}
                md={2}
                component={Link}
                to={`/actors/${character.id}`}
                style={{ textDecoration: "none" }}
                className={classes.castItem}
              >
                <img
                  src={`https://image.tmdb.org/t/p/w500/${character.profile_path}`}
                  alt={character.name}
                  className={classes.castImage}
                />
                <div className={classes.castTextWrapper}>
                  <Typography color="textPrimary">{character.name}</Typography>
                  <Typography color="textSecondary">
                    {character.character.split("/")[0]}
                  </Typography>
                </div>
              </Grid>
            ))}
        </Grid>

        <Grid container style={{ marginTop: "2rem" }} spacing={2}>
          <Grid xs={12} sm={6} className={classes.buttonsContaier}>
            <ButtonGroup size="small" variant="outlined">
              <Button
                target="_blank"
                rel="noopener noreferrer"
                href={data?.homepage}
                endIcon={<Language />}
              >
                Website
              </Button>
              <Button
                target="_blank"
                rel="noopener noreferrer"
                href={`https://www.imdb.com/title/${data?.imdb_id}`}
                endIcon={<MovieIcon />}
              >
                IMDB
              </Button>
              <Button onClick={() => setOpen(true)} endIcon={<Theaters />}>
                Trailer
              </Button>
            </ButtonGroup>
          </Grid>

          <Grid xs={12} sm={6} className={classes.buttonsContaier}>
            <ButtonGroup size="medium" variant="outlined">
              <Button
                onClick={addToFavorites}
                endIcon={
                  isMovieFavorited ? <FavoriteBorderOutlined /> : <Favorite />
                }
              >
                {isMovieFavorited ? "Remove from Favorite" : "Add to Favorite"}
              </Button>

              <Button
                onClick={addToWatchlist}
                endIcon={isMovieWatchlisted ? <Remove /> : <PlusOne />}
              >
                Watchlist
              </Button>

              <Button
                endIcon={<ArrowBack />}
                sx={{ borderColor: "primary.main" }}
              >
                <Typography
                  style={{ textDecoration: "none" }}
                  component={Link}
                  to="/"
                  color="inherit"
                  variant="subtitle2"
                >
                  Back to Home Page
                </Typography>
              </Button>
            </ButtonGroup>
          </Grid>
        </Grid>
      </Grid>

      <Box marginTop="5rem" width="100%">
        <Typography variant="h4" gutterBottom align="center">
          You might also like
        </Typography>
        {recommendations ? (
          <MovieList movies={recommendations} numberOfMovies={12} />
        ) : (
          <Box>Sorry, nothing was found.</Box>
        )}
      </Box>

      <Modal
        closeAfterTransition
        className={classes.modal}
        open={open}
        onClose={() => setOpen(false)}
      >
        {data?.videos?.results?.length > 0 && (
          <iframe
            className={classes.video}
            frameBorder="0"
            title="Trailer"
            src={`https://www.youtube.com/embed/${data.videos.results[0].key}?autoplay=1`}
            allow="autoplay; encrypted-media"
            allowFullScreen
          />
        )}
      </Modal>
    </Grid>
  );
};

export default MovieInfo;
