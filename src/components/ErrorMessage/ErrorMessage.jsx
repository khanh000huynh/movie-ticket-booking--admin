import { Box, makeStyles, Typography } from "@material-ui/core";
import { ErrorRounded } from "@material-ui/icons";
import React from "react";
import theme from "../../theme/theme";

const useStyles = makeStyles({
  root: {
    display: "flex",
    alignItems: "center",
    marginLeft: theme.spacing(2),
  },
  error: {
    color: theme.palette.error.dark,
    fontSize: "1rem",
    marginRight: theme.spacing(0.5),
    padding: 0,
  },
  text: {
    color: theme.palette.error.light,
    textAlign: "left",
    fontSize: "0.7rem",
  },
});

const ErrorMessage = (props) => {
  const classes = useStyles();
  const { message } = props;

  return (
    <Box className={classes.root}>
      <ErrorRounded className={classes.error} />
      <Typography component="div" className={classes.text}>
        {message}
      </Typography>
    </Box>
  );
};

export default ErrorMessage;
