import { makeStyles, Modal } from "@material-ui/core";
import HighlightOffRoundedIcon from "@material-ui/icons/HighlightOffRounded";
import React from "react";
import theme from "../../theme/theme";

const useStyles = makeStyles({
  root: {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    zIndex: 2,
  },
  videoContainer: {
    width: 900,
    height: 500,
    position: "relative",
    [theme.breakpoints.down("sm")]: {
      width: "90%",
      height: "90%",
    },
  },
  video: {
    width: "100%",
    height: "100%",
  },
  modal: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  playButton: {
    cursor: "pointer",
    color: theme.palette.common.white,
    "&:hover": {
      opacity: 0.8,
    },
  },
  playIcon: {
    width: "100%",
    height: "100%",
  },
  closeButton: {
    width: 40,
    height: 40,
    position: "absolute",
    top: -25,
    right: -25,
    color: theme.palette.common.white,
    cursor: "pointer",
    zIndex: 9999,
    "&:hover": {
      opacity: 0.8,
    },
  },
});

const Trailer = (props) => {
  const classes = useStyles();
  const trailer = props.trailer;
  const [open, setOpen] = React.useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const body = (
    <div className={classes.videoContainer}>
      <iframe
        src={trailer}
        frameBorder="0"
        allowFullScreen
        title="trailer"
        className={classes.video}
      ></iframe>
      <div onClick={handleClose}>
        <HighlightOffRoundedIcon className={classes.closeButton} />
      </div>
    </div>
  );

  return (
    <div className={classes.root}>
      <div onClick={handleOpen} className={classes.playButton}>
        <img
          className={classes.playIcon}
          src="https://tix.vn/app/assets/img/icons/play-video.png"
          alt="trailer"
        />
      </div>
      <Modal open={open} onClose={handleClose} className={classes.modal}>
        {body}
      </Modal>
    </div>
  );
};

export default Trailer;
