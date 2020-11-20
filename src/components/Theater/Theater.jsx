import {
  Box,
  CardMedia,
  makeStyles,
  Tooltip,
  Typography,
  withStyles,
} from "@material-ui/core";
import classnames from "classnames";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { chooseTheater } from "../../redux/actions/theaterActions";
import theme from "../../theme/theme";

const useStyles = makeStyles({
  media: {
    width: 50,
    height: 50,
    marginRight: theme.spacing(2),
  },
  theater: {
    cursor: "pointer",
    display: "flex !important",
    alignItems: "center",
    outline: "none",
  },
  table: {
    width: "100%",
    textAlign: "center",
    marginTop: theme.spacing(1),
  },
  blur: {
    opacity: 0.3,
    "&:hover": {
      opacity: 1,
    },
  },
});

const HtmlTooltip = withStyles((theme) => ({
  tooltip: {
    backgroundColor: theme.palette.grey[300],
    color: theme.palette.text.primary,
    width: 300,
    borderRadius: 4,
    padding: theme.spacing(1.5),
  },
}))(Tooltip);

const Theater = (props) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const { theater, defaultChosen } = props;
  const { danhSachRap, maCumRap, tenCumRap, diaChi } = theater;
  const chosenTheaterSystem = useSelector(
    (state) => state.theater.chosenTheaterSystem
  );
  const chosenTheater = useSelector((state) => state.theater.chosenTheater);
  const theaterDetail = React.useMemo(() => {
    return (
      <>
        <Typography>
          <b>Cụm rạp: </b>
          {tenCumRap}
        </Typography>
        <Typography>
          <b>Địa chỉ: </b>
          {diaChi}
        </Typography>
        <table
          border="1"
          cellSpacing="0"
          cellPadding={5}
          className={classes.table}
        >
          <thead>
            <tr>
              <th>Mã rạp</th>
              <th>Tên rạp</th>
            </tr>
          </thead>
          <tbody>
            {danhSachRap.map((rap, index) => (
              <tr key={index}>
                <td>{rap.maRap}</td>
                <td>{rap.tenRap}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </>
    );
  }, [tenCumRap, diaChi, classes.table, danhSachRap]);

  const hasBlurEffect = React.useCallback(() => {
    if (chosenTheater.maCumRap === maCumRap) return "";
    return classes.blur;
  }, [chosenTheater.maCumRap, maCumRap, classes.blur]);

  const handleChooseTheater = React.useCallback(
    (theater) => () => {
      dispatch(chooseTheater(theater));
    },
    [dispatch]
  );

  React.useEffect(() => {
    if (defaultChosen) {
      dispatch(chooseTheater(theater));
    }
  }, [defaultChosen, dispatch, theater]);

  return (
    <HtmlTooltip
      title={theaterDetail}
      placement="bottom-start"
      onClick={handleChooseTheater(theater)}
    >
      <Box className={classnames(classes.theater, hasBlurEffect())}>
        <CardMedia image={chosenTheaterSystem.logo} className={classes.media} />
        <Box>
          <Typography variant="subtitle2">
            {tenCumRap.length > 35
              ? tenCumRap.substr(0, 35) + "..."
              : tenCumRap}
          </Typography>
          <Typography>
            {diaChi.length > 33 ? diaChi.substr(0, 33) + "..." : diaChi}
          </Typography>
        </Box>
      </Box>
    </HtmlTooltip>
  );
};

export default Theater;
