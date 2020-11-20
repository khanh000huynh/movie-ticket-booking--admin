import { Box, Button, makeStyles, Popover } from "@material-ui/core";
import React from "react";
import { withRouter } from "react-router-dom";

const useStyles = makeStyles({
  root: {
    "&:hover": {
      backgroundColor: "transparent",
    },
    "& span": {
      textTransform: "none",
    },
  },
  dropdown: {
    width: 123,
    fontWeight: 400,
    cursor: "pointer",
    "& button": {
      textTransform: "none",
      fontWeight: 400,
    },
  },
});

const CustomPopover = (props) => {
  const classes = useStyles();
  const { content, dropdownList } = props;
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;

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

  return (
    <div>
      <Button onClick={handleClick} disableRipple className={classes.root}>
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
      >
        <Box className={classes.dropdown}>{renderDropdownList()}</Box>
      </Popover>
    </div>
  );
};

export default withRouter(CustomPopover);
