import React, { useState } from "react";
import { Button, Box, CircularProgress, Grid, Typography } from "@mui/material";
import { ArrowBack } from "@mui/icons-material";
import useStyles from "./actorStyle";
import { useNavigate, useParams } from "react-router-dom";
import {
  useGetActorDetailsQuery,
  useGetMoviesByActorIdQuery,
} from "../../services/TMDB";
import MovieList from "../MovieList/MovieList";
import Pagination from "../Pagination/Pagination";

const Actors = () => {
  const { id } = useParams();
  const classes = useStyles();
  const [page, setPage] = useState(1);
  const { data, isFetching, error } = useGetActorDetailsQuery(id);
  const navigate = useNavigate();
  const { data: movies } = useGetMoviesByActorIdQuery({ id, page });

  if (isFetching) {
    return (
      <Box display="flex" justifyContent="center">
        <CircularProgress size="8rem" />
      </Box>
    );
  }

  if (error) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center">
        <Button
          startIcon={<ArrowBack />}
          onClick={() => navigate(-1)}
          color="primary"
        >
          Go Back
        </Button>
      </Box>
    );
  }

  return (
    <>
      <Grid container spacing={3} columns={12} sx={{ display: "grid" }}>
        <Grid
          sx={{
            gridColumn: {
              xs: "span 12",
              lg: "span 5",
              xl: "span 4",
            },
          }}
        >
          <img
            src={`https://image.tmdb.org/t/p/w780/${data?.profile_path}`}
            className={classes.image}
            alt={data?.profile_path}
          />
        </Grid>

        <Grid
          sx={{
            gridColumn: {
              xs: "span 12",
              lg: "span 7",
              xl: "span 8",
            },
            display: "flex",
            justifyContent: "center",
            flexDirection: "column",
          }}
        >
          <Typography variant="h3" gutterBottom>
            {data?.name}
          </Typography>

          <Typography variant="h5" gutterBottom>
            Born: {new Date(data?.birthday).toDateString()}
          </Typography>

          <Typography variant="body1" align="justify" paragraph>
            {data?.biography || "Sorry, No Biography yet."}
          </Typography>

          <Box marginTop="2rem" display="flex" justifyContent="space-around">
            <Button
              variant="contained"
              color="primary"
              target="_blank"
              href={`https://www.imdb.com/name/${data?.imdb_id}`}
            >
              IMDB
            </Button>

            <Button
              startIcon={<ArrowBack />}
              onClick={() => navigate(-1)}
              color="primary"
            >
              Go Back
            </Button>
          </Box>
        </Grid>
      </Grid>

      <Box margin="2rem 0">
        <Typography variant="h4" gutterBottom align="center">
          {data?.name} Movies
        </Typography>
        {movies && <MovieList movies={movies} numberOfMovies={12} />}
        <Pagination
          currentPage={page}
          setPage={setPage}
          totalPages={movies?.total_page}
        />
      </Box>
    </>
  );
};

export default Actors;
