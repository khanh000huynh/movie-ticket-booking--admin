import { Box, InputBase, makeStyles } from "@material-ui/core";
import { SearchRounded } from "@material-ui/icons";
import React, { memo } from "react";
import { useDispatch } from "react-redux";
import { setSearchInfo } from "../../redux/actions/searchActions";
import theme from "../../theme/theme";

const useStyles = makeStyles({
  root: {
    display: "flex",
    alignItems: "center",
    border: "1px solid " + theme.palette.grey[250],
    borderRadius: 4,
    padding: theme.spacing(0, 2),
    margin: theme.spacing(0, 2),
    marginBottom: theme.spacing(2),
  },
  searchInput: {
    width: "100%",
    marginLeft: theme.spacing(2),
  },
});

const Search = () => {
  const classes = useStyles();
  let typingTimer = undefined;
  const doneTypingInterval = 300;
  const dispatch = useDispatch();

  const handleKeyUp = (event) => {
    const { value } = event.target;
    const doneTyping = () => {
      dispatch(setSearchInfo(value));
    };
    clearTimeout(typingTimer);
    typingTimer = setTimeout(doneTyping, doneTypingInterval);
  };

  return (
    <Box className={classes.root}>
      <SearchRounded />
      <InputBase
        className={classes.searchInput}
        placeholder="Nhập thông tin cần tìm..."
        onKeyUp={handleKeyUp}
        spellCheck="false"
      />
    </Box>
  );
};

export default memo(Search);
