import { Box, CircularProgress, makeStyles } from "@material-ui/core";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { withRouter } from "react-router-dom";
import BackButton from "../../components/BackButton/BackButton";
import CreateButton from "../../components/CreateButton/CreateButton";
import DetailShowtimeBottom from "../../components/DetailShowtimeBottom/DetailShowtimeBottom";
import DetailShowtimeTop from "../../components/DetailShowtimeTop/DetailShowtimeTop";
import Search from "../../components/Search/Search";
import Title from "../../components/Title/Title";
import {
  setIsFinishedLoadingShowtime,
  setShowtimeByMaPhim,
} from "../../redux/actions/showtimeActions";
import theme from "../../theme/theme";

const useStyles = makeStyles({
  header: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    marginRight: theme.spacing(2),
  },
  content: {
    padding: theme.spacing(2),
    paddingTop: 0,
  },
  loader: {
    border: "1px solid " + theme.palette.grey[250],
    height: 535,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    margin: theme.spacing(2),
    marginTop: 0,
  },
});

const DetailShowtimePage = (props) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const renderShowtimeWithAllTheaters = React.useMemo(
    () => JSON.parse(sessionStorage.getItem("renderShowtimeWithAllTheaters")),
    []
  );
  const showtimeByMaPhim = useSelector(
    (state) => state.showtime.showtimeByMaPhim
  );
  const isFinishedLoading = useSelector(
    (state) => state.showtime.isFinishedLoading
  );

  const handleRedirectToCreateShowtimePage = React.useCallback(() => {
    sessionStorage.setItem(
      "showtimeByMaPhim",
      JSON.stringify(showtimeByMaPhim)
    );
    props.history.push(
      `/showtime-management/create-showtime/${props.match.params.maPhim}`
    );
  }, [showtimeByMaPhim, props.history, props.match]);

  React.useEffect(() => {
    if (sessionStorage.getItem("chosenTheater"))
      dispatch(setShowtimeByMaPhim(props.match.params.maPhim));
  }, [dispatch, props.match]);

  React.useEffect(() => {
    sessionStorage.setItem("currentPathname", props.location.pathname);
  }, [props.location.pathname]);

  React.useEffect(() => {
    return () => {
      if (props.location.pathname)
        dispatch(setIsFinishedLoadingShowtime(false));
    };
  }, [props.location.pathname, dispatch]);

  return (
    <Box>
      <Box className={classes.header}>
        <Box display="flex" alignItems="center">
          <BackButton
            prevPath={
              renderShowtimeWithAllTheaters
                ? "/movie-management"
                : "/showtime-management"
            }
          />
          <Title text="LỊCH CHIẾU THEO PHIM" />
        </Box>
        {isFinishedLoading && (
          <CreateButton
            text="THÊM LỊCH CHIẾU"
            onClick={handleRedirectToCreateShowtimePage}
          />
        )}
      </Box>
      <Box>
        <Search />
      </Box>
      {!showtimeByMaPhim || !showtimeByMaPhim.maPhim ? (
        <Box className={classes.loader}>
          <CircularProgress size={80} />
        </Box>
      ) : (
        <Box className={classes.content}>
          <DetailShowtimeTop showtimeByMaPhim={showtimeByMaPhim} />
          <DetailShowtimeBottom showtimeByMaPhim={showtimeByMaPhim} />
        </Box>
      )}
    </Box>
  );
};

export default withRouter(DetailShowtimePage);
