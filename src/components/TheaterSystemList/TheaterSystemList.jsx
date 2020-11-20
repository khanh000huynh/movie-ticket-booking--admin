import { Grid, makeStyles, Typography } from "@material-ui/core";
import { Skeleton } from "@material-ui/lab";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { setTheaterSystemList } from "../../redux/actions/theaterActions";
import theme from "../../theme/theme";
import TheaterSystem from "../TheaterSystem/TheaterSystem";

const useStyles = makeStyles({
  root: {
    borderBottom: "1px solid " + theme.palette.grey[250],
    alignItems: "center",
    padding: theme.spacing(1),
    WebkitUserSelect: "none",
    MozUserSelect: "none",
    msUserSelect: "none",
    userSelect: "none",
  },
  theaterSystemList: {
    justifyContent: "space-between",
    padding: theme.spacing(0, 4),
  },
});

const TheaterSystemList = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const theaterSystemList = useSelector(
    (state) => state.theater.theaterSystemList
  );

  const renderTheaterSystem = React.useCallback(() => {
    return !theaterSystemList.length
      ? [...new Array(7)].map((item, index) => (
          <Skeleton width={50} height={50} animation="wave" key={index} />
        ))
      : theaterSystemList.map((system, index) => (
          <TheaterSystem system={system} key={index} />
        ));
  }, [theaterSystemList]);

  React.useEffect(() => {
    dispatch(setTheaterSystemList());
  }, [dispatch]);

  return (
    <Grid container className={classes.root}>
      <Grid item container justify="center" xs={2}>
        <Typography component="span">Hệ thống rạp chiếu</Typography>
      </Grid>
      <Grid item container xs={10} className={classes.theaterSystemList}>
        {renderTheaterSystem()}
      </Grid>
    </Grid>
  );
};

export default TheaterSystemList;
