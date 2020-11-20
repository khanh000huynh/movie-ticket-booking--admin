import { IconButton, Tooltip } from "@material-ui/core";
import React from "react";

const MiniIconButton = (props) => {
  const { ariaLabel, children, classname, disabled, hint, onClick } = props;

  return (
    <Tooltip title={hint} onClick={onClick}>
      <span>
        <IconButton
          aria-label={ariaLabel}
          className={classname}
          disabled={!!disabled}
        >
          {children}
        </IconButton>
      </span>
    </Tooltip>
  );
};

export default MiniIconButton;
