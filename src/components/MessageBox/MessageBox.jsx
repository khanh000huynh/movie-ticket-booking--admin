import { Box, Button, makeStyles, Modal, Typography } from "@material-ui/core";
import CheckCircleOutlineRoundedIcon from "@material-ui/icons/CheckCircleOutlineRounded";
import ErrorOutlineOutlinedIcon from "@material-ui/icons/ErrorOutlineOutlined";
import HelpOutlineOutlinedIcon from "@material-ui/icons/HelpOutlineOutlined";
import InfoOutlinedIcon from "@material-ui/icons/InfoOutlined";
import ReportProblemOutlinedIcon from "@material-ui/icons/ReportProblemOutlined";
import React from "react";
import theme from "../../theme/theme";

const useStyles = makeStyles({
  paper: {
    backgroundColor: theme.palette.background.paper,
    border: "5px dashed " + theme.palette.primary.main,
    boxShadow: theme.shadows[5],
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 300,
    outline: "none",
    padding: theme.spacing(2),
  },
  title: {
    display: "flex",
    alignItems: "center",
    color: theme.palette.warning.main,
    textTransform: "uppercase",
    borderBottom: "1px dashed " + theme.palette.text.primary,
    paddingBottom: theme.spacing(2),
  },
  message: {
    margin: theme.spacing(2, 0),
  },
  ok: {
    float: "right",
    backgroundColor: theme.palette.primary.main,
    color: theme.palette.text.secondary,
    "&:hover": {
      backgroundColor: theme.palette.primary.light,
    },
  },
});

const MessageBox = (props) => {
  const classes = useStyles();
  const { message, type } = props;
  const [open, setOpen] = React.useState(false);

  const handleClose = React.useCallback(() => {
    setOpen(false);
  }, []);

  const handleEnter = React.useCallback(
    (event) => {
      if (event.key === "Enter") handleClose();
    },
    [handleClose]
  );

  const iconByMessageType = React.useMemo(() => {
    if (type === "info") return <InfoOutlinedIcon style={{ color: "black" }} />;
    if (type === "success")
      return <CheckCircleOutlineRoundedIcon style={{ color: "green" }} />;
    if (type === "confirm")
      return <HelpOutlineOutlinedIcon style={{ color: "black" }} />;
    if (type === "warning")
      return <ReportProblemOutlinedIcon style={{ color: "orange" }} />;
    return <ErrorOutlineOutlinedIcon style={{ color: "red" }} />;
  }, [type]);

  const messageTitleByMessageType = React.useMemo(() => {
    if (type === "info" || type === "success") return "Thông báo";
    if (type === "confirm") return "Xác nhận";
    if (type === "warning") return "Cảnh báo";
    return "Lỗi";
  }, [type]);

  const body = React.useMemo(
    () => (
      <Box className={classes.paper} onKeyDown={handleEnter}>
        <Box className={classes.title}>
          {iconByMessageType}
          <Typography>&nbsp;&nbsp;{messageTitleByMessageType}</Typography>
        </Box>
        <Typography className={classes.message}>{message}</Typography>
        <Button className={classes.ok} onClick={handleClose}>
          OK
        </Button>
      </Box>
    ),
    [
      classes.paper,
      handleEnter,
      classes.title,
      iconByMessageType,
      messageTitleByMessageType,
      classes.message,
      classes.ok,
      handleClose,
      message,
    ]
  );

  React.useEffect(() => {
    if (message) setOpen(true);
  }, [message]);

  return (
    <>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
      >
        {body}
      </Modal>
    </>
  );
};

export default MessageBox;
