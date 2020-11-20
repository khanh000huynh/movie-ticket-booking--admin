import { Grid, makeStyles, Typography } from "@material-ui/core";
import { Skeleton } from "@material-ui/lab";
import React from "react";
import { useSelector } from "react-redux";
import Slider from "react-slick";
import "slick-carousel/slick/slick-theme.css";
import "slick-carousel/slick/slick.css";
import theme from "../../theme/theme";
import Theater from "../Theater/Theater";
import { GlobalSlickCss } from "./global";

const useStyles = makeStyles({
  root: {
    alignItems: "center",
    borderBottom: "1px solid " + theme.palette.grey[250],
    borderTop: "none",
    padding: theme.spacing(1),
    WebkitUserSelect: "none",
    MozUserSelect: "none",
    msUserSelect: "none",
    userSelect: "none",
  },
  theaterList: {
    padding: theme.spacing(0, 4),
  },
});

const TheaterList = () => {
  const classes = useStyles();
  const chosenTheaterSystem = useSelector(
    (state) => state.theater.chosenTheaterSystem
  );
  const theaterList = useSelector((state) => state.theater.theaterList);
  const settings = React.useMemo(
    () => ({
      dots: false,
      infinite: false,
      speed: 500,
      slidesToShow: 3,
      slidesToScroll: 3,
    }),
    []
  );
  const getTheaterListByTheaterSystem = React.useMemo(() => {
    return theaterList.filter(
      (theater) => theater.maHeThongRap === chosenTheaterSystem.maHeThongRap
    )[0]?.theaters;
  }, [theaterList, chosenTheaterSystem.maHeThongRap]);

  const renderTheater = React.useCallback(() => {
    return !getTheaterListByTheaterSystem
      ? [...new Array(3)].map((item, index) => (
          <Skeleton width="100%" height={46} animation="wave" key={index} />
        ))
      : getTheaterListByTheaterSystem.map((theater, index) => (
          <Theater theater={theater} key={index} defaultChosen={index === 0} />
        ));
  }, [getTheaterListByTheaterSystem]);

  return (
    <Grid container className={classes.root}>
      <Grid item container justify="center" xs={2}>
        <Typography component="span">
          Cụm rạp chiếu&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
        </Typography>
      </Grid>
      <Grid item xs={10} className={classes.theaterList}>
        <GlobalSlickCss />
        <Slider key={chosenTheaterSystem.maHeThongRap} {...settings}>
          {renderTheater()}
        </Slider>
      </Grid>
    </Grid>
  );
};

export default TheaterList;
