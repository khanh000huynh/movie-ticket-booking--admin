import {
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  makeStyles,
  Typography,
} from "@material-ui/core";
import React from "react";
import { useSelector } from "react-redux";
import { withRouter } from "react-router-dom";
import theme from "../../theme/theme";

const useStyles = makeStyles({
  // anim: {
  //   animation: "$fadeIn 1s",
  // },
  "@keyframes fadeIn": {
    from: {
      opacity: 0,
    },
    to: {
      opacity: 1,
    },
  },
  root: {
    animation: "$fadeIn 1s",
    width: "100%",
    border: "none",
    boxSizing: "border-box",
    padding: theme.spacing(1),
    "& button": {
      border: "1px solid " + theme.palette.grey[250],
      padding: theme.spacing(2),
    },
  },
  media: {
    width: "100%",
    height: 260,
    margin: "0 auto",
  },
  content: {
    padding: 0,
    marginTop: theme.spacing(1),
    "& > p:nth-child(2)": {
      wordBreak: "break-all",
    },
  },
});

const MovieAndShowtime = (props) => {
  const classes = useStyles();
  const { movie } = props;
  const { hinhAnh, maPhim, tenPhim, lstLichChieuTheoPhim } = movie;
  const chosenTheaterSystem = useSelector(
    (state) => state.theater.chosenTheaterSystem
  );
  const chosenTheater = useSelector((state) => state.theater.chosenTheater);

  const handleRedirectToDetailShowtime = React.useCallback(() => {
    sessionStorage.setItem("renderShowtimeWithAllTheaters", false);
    sessionStorage.setItem(
      "chosenTheaterSystem",
      JSON.stringify(chosenTheaterSystem)
    );
    sessionStorage.setItem("chosenTheater", JSON.stringify(chosenTheater));
    props.history.push(`/showtime-management/detail-showtime/${maPhim}`);
  }, [chosenTheaterSystem, chosenTheater, props.history, maPhim]);

  React.useEffect(() => console.log("render"), []);

  // React.useEffect(() => {
  //   const rootEls = document.getElementsByClassName(classes.root);
  //   console.log(rootEls);
  //   for (let root of rootEls) {
  //     const regex = new RegExp(classes.anim, "g");
  //     root.className.replace(regex, "");
  //     root.className += ` ${classes.anim}`;
  //   }
  // }, [classes.anim, classes.root]);

  return (
    <Card
      className={classes.root}
      elevation={0}
      onClick={handleRedirectToDetailShowtime}
    >
      <CardActionArea>
        <CardMedia image={hinhAnh} className={classes.media} />
        <CardContent className={classes.content}>
          <Typography>
            <b>Mã phim:</b> {maPhim}
          </Typography>
          <Typography>
            <b>Tên phim: </b>
            {tenPhim.length > 22 ? tenPhim.substr(0, 22) + "..." : tenPhim}
          </Typography>
          <Typography>
            <b>Tổng suất chiếu:</b>{" "}
            {lstLichChieuTheoPhim ? lstLichChieuTheoPhim.length : "?"}
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
};

export default withRouter(MovieAndShowtime);
