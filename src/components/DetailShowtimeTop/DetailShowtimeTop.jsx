import { Box, CardMedia, makeStyles, Typography } from "@material-ui/core";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { createAction } from "../../redux/actions/actionCreator";
import { SET_SHOWTIME_BY_MAPHIM } from "../../redux/actions/actionTypes";
import { setTheaterList } from "../../redux/actions/theaterActions";
import theme from "../../theme/theme";

const useStyles = makeStyles({
  root: {
    display: "flex",
    alignItems: "center",
    padding: theme.spacing(2),
    backgroundColor: theme.palette.grey[350],
    marginBottom: theme.spacing(2),
    "& select": {
      border: "none",
      outline: "none",
      padding: theme.spacing(0, 0.5),
    },
  },
  media: {
    width: 83.2,
    height: 83.2,
  },
});

const DetailShowtimeTop = (props) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const { showtimeByMaPhim } = props;
  const {
    hinhAnh,
    maPhim,
    tenPhim,
    lichChieuPhim,
    heThongRapChieu,
  } = showtimeByMaPhim;
  const chosenTheaterFromSession = React.useMemo(
    () => JSON.parse(sessionStorage.getItem("chosenTheater")),
    []
  );
  const renderShowtimeWithAllTheaters = React.useMemo(
    () => JSON.parse(sessionStorage.getItem("renderShowtimeWithAllTheaters")),
    []
  );
  const cumRapChieu = React.useMemo(() => {
    if (!heThongRapChieu) return;
    let result = [];
    const heThongRapChieuList = [];
    const temp = heThongRapChieu.map((heThong) => {
      heThongRapChieuList.push(heThong.maHeThongRap);
      return heThong.cumRapChieu;
    });
    temp.forEach((item, index) => {
      item.forEach((i) => (i.maHeThongRap = heThongRapChieuList[index]));
      result = [...result, ...item];
    });
    return result;
  }, [heThongRapChieu]);
  const selectRef = React.useRef();
  const theaterList = useSelector((state) => state.theater.theaterList);

  const setChosenTheaterFromSession = React.useCallback(
    (maCumRap) => {
      if (!theaterList || !theaterList.length) return;
      const selectedCumRapChieu = cumRapChieu.find(
        (cumRap) => cumRap.maCumRap === maCumRap
      );
      const theaters = theaterList.find(
        (theater) => theater.maHeThongRap === selectedCumRapChieu.maHeThongRap
      )?.theaters;
      const chosenTheater =
        theaters && theaters.find((theater) => theater.maCumRap === maCumRap);
      chosenTheater &&
        sessionStorage.setItem("chosenTheater", JSON.stringify(chosenTheater));
    },
    [theaterList, cumRapChieu]
  );

  const setLichChieuPhimByMaCumRap = React.useCallback(
    (maCumRap) => {
      const lichChieuPhim = cumRapChieu.find((rap) => rap.maCumRap === maCumRap)
        .lichChieuPhim;
      dispatch(
        createAction(SET_SHOWTIME_BY_MAPHIM, {
          ...showtimeByMaPhim,
          lichChieuPhim,
        })
      );
    },
    [cumRapChieu, showtimeByMaPhim, dispatch]
  );

  const handleChangeCumRap = React.useCallback(
    (event) => {
      setLichChieuPhimByMaCumRap(event.target.value);
      sessionStorage.setItem(
        "showtimeByMaPhim",
        JSON.stringify(showtimeByMaPhim)
      );
      setChosenTheaterFromSession(event.target.value);
    },
    [setLichChieuPhimByMaCumRap, setChosenTheaterFromSession, showtimeByMaPhim]
  );

  const renderCumRapChieu = React.useCallback(() => {
    if (!renderShowtimeWithAllTheaters)
      return <Typography>{chosenTheaterFromSession.tenCumRap}</Typography>;
    if (renderShowtimeWithAllTheaters && !cumRapChieu.length)
      return <Typography>Không có</Typography>;
    return (
      cumRapChieu && (
        <select ref={selectRef} onChange={handleChangeCumRap}>
          {cumRapChieu.map((rap, index) => (
            <option value={rap.maCumRap} key={index}>
              {rap.tenCumRap}
            </option>
          ))}
        </select>
      )
    );
  }, [
    renderShowtimeWithAllTheaters,
    chosenTheaterFromSession,
    handleChangeCumRap,
    cumRapChieu,
  ]);

  React.useEffect(() => {
    cumRapChieu &&
      cumRapChieu.forEach((rap) => {
        dispatch(setTheaterList(rap.maHeThongRap));
      });
  }, [cumRapChieu, dispatch]);

  React.useEffect(() => {
    renderShowtimeWithAllTheaters &&
      cumRapChieu.length &&
      setChosenTheaterFromSession(cumRapChieu[0].maCumRap);
  }, [renderShowtimeWithAllTheaters, cumRapChieu, setChosenTheaterFromSession]);

  React.useEffect(() => {
    renderShowtimeWithAllTheaters &&
      cumRapChieu.length &&
      setLichChieuPhimByMaCumRap(cumRapChieu[0].maCumRap);
    // eslint-disable-next-line
  }, [cumRapChieu]);

  return (
    <Box className={classes.root}>
      <CardMedia image={hinhAnh} className={classes.media} />
      <Box ml={2}>
        <Typography>
          <b>Mã phim:</b> {maPhim ? maPhim : "?"}
        </Typography>
        <Typography>
          <b>Tên phim:</b> {tenPhim ? tenPhim : "?"}
        </Typography>
        <Typography>
          <b>Thời lượng:</b>{" "}
          {lichChieuPhim ? lichChieuPhim[0].thoiLuong : 0 + " phút"}
        </Typography>
        <Box display="flex" alignItems="center">
          <Typography>
            <b>Cụm rạp chiếu:</b>
          </Typography>
          <Box display="flex" alignItems="center" ml={0.5}>
            {renderCumRapChieu()}
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default DetailShowtimeTop;
