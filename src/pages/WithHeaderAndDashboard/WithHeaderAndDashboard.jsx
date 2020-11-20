import { Grid, makeStyles } from "@material-ui/core";
import React from "react";
import Header from "../../components/Header/Header";
import theme from "../../theme/theme";
import Dashboard from "../Dashboard/Dashboard";

const useStyles = makeStyles({
  root: {
    paddingTop: theme.spacing(8),
    height: "100%",
  },
  left: {
    height: "100%",
    borderBottom: "1px solid " + theme.palette.grey[250],
  },
  right: {
    height: "100%",
    border: "1px solid " + theme.palette.grey[250],
  },
});

const WithHeaderAndDashboard = (props) => {
  const { children } = props;
  const classes = useStyles();

  return (
    <>
      <Header />
      <Grid container className={classes.root}>
        <Grid item md={2} className={classes.left}>
          <Dashboard />
        </Grid>
        <Grid item md={10} className={classes.right}>
          {children}
        </Grid>
      </Grid>
    </>
  );
};

export default WithHeaderAndDashboard;
