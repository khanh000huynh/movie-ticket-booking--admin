import { makeStyles, Typography } from "@material-ui/core";
import React from "react";
import theme from "../../theme/theme";

const useStyles = makeStyles({
  title: {
    fontSize: "1.5rem",
    color: theme.palette.warning.main,
    padding: theme.spacing(1, 2),
  },
});

const Title = (props) => {
  const classes = useStyles();
  const { text } = props;

  return <Typography className={classes.title}>{text}</Typography>;
};

export default Title;
