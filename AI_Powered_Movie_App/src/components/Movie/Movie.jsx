import React from "react";
import { Typography, Grid, Grow, Tooltip, Rating } from "@mui/material";
import useStyles from "./movieStyles";
import { Link } from "react-router-dom";
import dayjs from "dayjs";

const Movie = ({ movie, i }) => {
  const classes = useStyles();

  // Skip rendering if no poster
  if (!movie.poster_path) return null;

  // Check if movie hasn't been released yet
  const isUnreleased =
    movie.release_date && dayjs(movie.release_date).isAfter(dayjs());

  return (
    <Grid item xs={12} sm={6} md={4} lg={3} xl={2} className={classes.movie}>
      <Grow in key={i} timeout={(i + 1) * 250}>
        <Link to={`/movie/${movie.id}`} className={classes.links}>
          <img
            className={classes.image}
            src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`}
            alt={movie.title}
          />
          <Typography className={classes.title}>{movie.title}</Typography>

          {movie.vote_average ? (
            <Tooltip disableTouchListener title={`${movie.vote_average} / 10`}>
              <div>
                <Rating
                  readOnly
                  value={movie.vote_average / 2}
                  precision={0.1}
                />
              </div>
            </Tooltip>
          ) : isUnreleased ? (
            <Typography
              variant="body2"
              align="center"
              className={classes.comingSoon}
            >
              Coming Soon
            </Typography>
          ) : null}
        </Link>
      </Grow>
    </Grid>
  );
};

export default Movie;
