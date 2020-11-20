import { Box, Grid, makeStyles, Typography } from "@material-ui/core";
import React from "react";
import { withRouter } from "react-router-dom";
import ShowtimeLayout from "../../components/ShowtimeLayout/ShowtimeLayout";
import TheaterList from "../../components/TheaterList/TheaterList";
import TheaterSystem from "../../components/TheaterSystemList/TheaterSystemList";
import Title from "../../components/Title/Title";
import theme from "../../theme/theme";

const useStyles = makeStyles({
  root: {
    borderBottom: "1px solid " + theme.palette.grey[250],
  },
  content: {
    margin: "0 auto",
    justifyContent: "center",
  },
  movieAndShowtimeTitle: {
    width: "100%",
    backgroundColor: theme.palette.common.white,
    borderBottom: "1px solid " + theme.palette.grey[250],
    padding: theme.spacing(1, 0),
    position: "sticky",
    zIndex: 9,
    top: 0,
    left: 0,
    textAlign: "center",
  },
});

const ShowtimeManagementPage = (props) => {
  const classes = useStyles();

  React.useEffect(() => {
    sessionStorage.setItem("currentPathname", props.location.pathname);
  }, [props.location.pathname]);

  return (
    <>
      {/* <Prompt when={true} message="Are you leaving now?" /> */}
      <Box
        display="flex"
        alignItems="center"
        justifyContent="space-between"
        mr={2}
        className={classes.root}
      >
        <Title text="LỊCH CHIẾU" />
      </Box>
      <Grid container className={classes.content}>
        <Grid item xs={12}>
          <TheaterSystem />
        </Grid>
        <Grid item xs={12}>
          <TheaterList />
        </Grid>
        <Grid
          item
          container
          justify="center"
          xs={12}
          style={{ height: "100%" }}
        >
          <Typography component="h3" className={classes.movieAndShowtimeTitle}>
            Phim và lịch chiếu
          </Typography>
          <ShowtimeLayout />
        </Grid>
      </Grid>
    </>
  );
};

export default withRouter(ShowtimeManagementPage);
