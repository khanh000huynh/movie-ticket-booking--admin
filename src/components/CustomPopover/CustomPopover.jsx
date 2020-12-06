import { Box, Button, makeStyles, Popover } from "@material-ui/core";
import React from "react";
import { withRouter } from "react-router-dom";

const CustomPopover = (props) => {
  const { content, dropdownList } = props;
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;
  const [rootWidth, setRootWidth] = React.useState(0);
  const useStyles = makeStyles({
    content: {
      "&:hover": {
        backgroundColor: "transparent",
      },
      "& span": {
        textTransform: "none",
      },
    },
    popover: {
      "& .MuiPaper-root": {
        borderRadius: 0,
      },
    },
    dropdown: {
      cursor: "pointer",
      fontWeight: 400,
      width: rootWidth,
      "& button": {
        textTransform: "none",
        fontWeight: 400,
      },
    },
  });
  const classes = useStyles();

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const renderDropdownList = React.useCallback(() => {
    return dropdownList.map((item, index) => (
      <Button fullWidth key={index}>
        {item}
      </Button>
    ));
  }, [dropdownList]);

  React.useEffect(() => {
    setRootWidth(document.querySelector("#content > span").offsetWidth);
  }, []);

  React.useEffect(() => {
    setAnchorEl(null);
  }, [props.location.pathname]);

  return (
    <>
      <Button
        id="content"
        onClick={handleClick}
        disableRipple
        className={classes.content}
      >
        {content}
      </Button>
      <Popover
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "center",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "center",
        }}
        className={classes.popover}
      >
        <Box className={classes.dropdown}>{renderDropdownList()}</Box>
      </Popover>
    </>
  );
};

export default withRouter(CustomPopover);
