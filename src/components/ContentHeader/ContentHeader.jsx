import { Box, makeStyles } from "@material-ui/core";
import React from "react";
import theme from "../../theme/theme";
import BackButton from "../BackButton/BackButton";
import Title from "../Title/Title";

const useStyles = makeStyles({
  root: {
    display: "flex",
    alignItems: "center",
    borderBottom: "1px solid " + theme.palette.grey[250],
  },
});

const ContentHeader = (props) => {
  const classes = useStyles();
  const { prevPath, title } = props;

  return (
    <Box className={classes.root}>
      <BackButton prevPath={prevPath} />
      <Title text={title} />
    </Box>
  );
};

export default ContentHeader;
