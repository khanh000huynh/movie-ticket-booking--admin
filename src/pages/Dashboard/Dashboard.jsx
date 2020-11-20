import { Box, Grid, makeStyles, Typography } from "@material-ui/core";
import {
  MovieCreationRounded,
  PersonRounded,
  ScheduleRounded,
} from "@material-ui/icons";
import classnames from "classnames";
import React from "react";
import { withRouter } from "react-router-dom";
import theme from "../../theme/theme";

const useStyles = makeStyles({
  root: {
    WebkitUserSelect: "none",
    MozUserSelect: "none",
    msUserSelect: "none",
    userSelect: "none",
  },
  menuItem: {
    display: "flex",
    alignItems: "center",
    borderBottom: "1px solid " + theme.palette.grey[250],
    color: theme.palette.text.primary,
    cursor: "pointer",
    padding: theme.spacing(1, 2),
    textDecoration: "none",
    "&:hover": {
      backgroundColor: theme.palette.warning.light,
      color: theme.palette.text.secondary,
    },
  },
  icons: {
    fontSize: "2.3rem",
    marginRight: theme.spacing(2),
  },
  active: {
    backgroundColor: theme.palette.warning.main,
    color: theme.palette.text.secondary,
  },
});

const Dashboard = (props) => {
  const classes = useStyles();
  const currentPathname = sessionStorage.getItem("currentPathname");
  const pages = React.useMemo(
    () => ["/movie-management", "/user-management", "/showtime-management"],
    []
  );

  const hasPathname = React.useCallback((path, page) => {
    if (!path) return;
    const regex = new RegExp(page.replace("/", ""), "g");
    return path.search(regex) !== -1;
  }, []);

  const handleRedirect = React.useCallback(
    (path) => () => {
      sessionStorage.setItem("currentPathname", path);
      props.history.push(path);
    },
    [props.history]
  );

  React.useEffect(() => {
    if (!currentPathname) sessionStorage.setItem("currentPathname", pages[0]);
  }, [currentPathname, pages]);

  return (
    <Grid className={classes.root}>
      <Grid item>
        <Box
          className={classnames(
            classes.menuItem,
            hasPathname(currentPathname, pages[0]) && classes.active
          )}
          onClick={handleRedirect(pages[0])}
        >
          <MovieCreationRounded className={classes.icons} />
          <Typography>Quản lý phim</Typography>
        </Box>
      </Grid>
      <Grid item>
        <Box
          className={classnames(
            classes.menuItem,
            hasPathname(currentPathname, pages[1]) && classes.active
          )}
          onClick={handleRedirect(pages[1])}
        >
          <PersonRounded className={classes.icons} />
          <Typography>Quản lý người dùng</Typography>
        </Box>
      </Grid>
      <Grid item>
        <Box
          className={classnames(
            classes.menuItem,
            hasPathname(currentPathname, pages[2]) && classes.active
          )}
          onClick={handleRedirect(pages[2])}
        >
          <ScheduleRounded className={classes.icons} />
          <Typography>Quản lý lịch chiếu</Typography>
        </Box>
      </Grid>
    </Grid>
  );
};

export default withRouter(Dashboard);
