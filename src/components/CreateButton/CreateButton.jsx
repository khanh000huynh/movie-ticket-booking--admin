import { Button, makeStyles } from "@material-ui/core";
import React, { memo } from "react";
import theme from "../../theme/theme";

const useStyles = makeStyles({
  root: {
    height: 40,
    backgroundColor: theme.palette.primary.main,
    color: theme.palette.text.secondary,
    "&:hover": {
      backgroundColor: theme.palette.primary.light,
    },
  },
});

const CreateButton = (props) => {
  const classes = useStyles();
  const { text, disabled, onClick } = props;

  return (
    <Button
      type="submit"
      disabled={disabled}
      className={classes.root}
      onClick={onClick}
    >
      {text}
    </Button>
  );
};

export default memo(CreateButton);
