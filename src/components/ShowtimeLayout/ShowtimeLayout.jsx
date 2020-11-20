import { Box, CircularProgress, Grid, makeStyles } from "@material-ui/core";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { setShowing } from "../../redux/actions/movieActions";
import theme from "../../theme/theme";
import MovieAndShowtime from "../MovieAndShowtime/MovieAndShowtime";

const useStyles = makeStyles({
  root: {
    width: "100%",
    height: 427,
    overflowY: "scroll",
    padding: theme.spacing(1),
    position: "relative",
    "&::-webkit-scrollbar": {
      width: 5,
    },
    "&::-webkit-scrollbar-track": {
      backgroundColor: theme.palette.grey[250],
    },
    "&::-webkit-scrollbar-thumb": {
      backgroundColor: theme.palette.grey[150],
    },
  },
  notFound: {
    margin: "0 auto",
    height: 395,
    color: theme.palette.grey[250],
  },
  loader: {
    width: "100%",
    height: "100%",
    minHeight: 395,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    border: "1px solid " + theme.palette.grey[250],
  },
});

const ShowtimeLayout = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const chosenTheaterSystem = useSelector(
    (state) => state.theater.chosenTheaterSystem
  );
  const chosenTheater = useSelector((state) => state.theater.chosenTheater);
  const showing = useSelector((state) => state.movie.showing);
  const cumRap = React.useMemo(() => showing[0] && showing[0].lstCumRap, [
    showing,
  ]);
  const [isLoading, setIsLoading] = React.useState(true);

  React.useEffect(() => {
    dispatch(setShowing(chosenTheaterSystem.maHeThongRap));
  }, [dispatch, chosenTheaterSystem.maHeThongRap]);

  const renderMovieAndShowtime = React.useCallback(() => {
    const theaterHasShowingMovies =
      cumRap &&
      cumRap.filter((rap) => rap.maCumRap === chosenTheater.maCumRap)[0];

    if (theaterHasShowingMovies) {
      const showingMovies = theaterHasShowingMovies.danhSachPhim;
      if (showingMovies && !isLoading) {
        return showingMovies.map((movie, index) => (
          <Grid item xs={3} key={index}>
            <MovieAndShowtime movie={movie} />
          </Grid>
        ));
      }
      if (showingMovies.length) setIsLoading(false);
    }
    if (!theaterHasShowingMovies && isLoading)
      return (
        <Box className={classes.loader}>
          <CircularProgress size={80} />
        </Box>
      );

    return <Box className={classes.notFound}>Không có suất chiếu!</Box>;
  }, [
    cumRap,
    chosenTheater.maCumRap,
    classes.loader,
    classes.notFound,
    isLoading,
  ]);

  return (
    <Grid container className={classes.root}>
      {renderMovieAndShowtime()}
    </Grid>
  );
};

export default ShowtimeLayout;
