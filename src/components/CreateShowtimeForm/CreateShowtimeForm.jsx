import { Box, Grid, makeStyles } from "@material-ui/core";
import { Field, Form, Formik } from "formik";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { CreateShowtimeSchema } from "../../formik/schema";
import {
  setTheaterList,
  setTheaterSystemList,
} from "../../redux/actions/theaterActions";
import theme from "../../theme/theme";
import { toDMY, toYMD } from "../../utils/datetime";
import CreateButton from "../CreateButton/CreateButton";
import ErrorMessage from "../ErrorMessage/ErrorMessage";

const useStyle = makeStyles({
  root: {
    padding: theme.spacing(1, 0),
    "& .MuiGrid-item, & .MuiFormControl-root": {
      borderBox: "box-sizing",
      margin: theme.spacing(0.5, 0),
      "& input": {
        width: "100%",
        height: 40,
        boxSizing: "border-box",
        padding: theme.spacing(0, 1),
        margin: theme.spacing(0, 2),
      },
    },
    "& label": {
      fontWeight: 500,
      margin: theme.spacing(0, 0, 0.5, 2),
    },
    "& select": {
      width: "100%",
      height: 40,
      boxSizing: "border-box",
      padding: theme.spacing(0, 1),
      margin: theme.spacing(0, 2),
    },
  },
  button: {
    margin: theme.spacing(2),
    "& button": {
      width: "100%",
    },
  },
});

const CreateShowtimeForm = () => {
  const classes = useStyle();
  const dispatch = useDispatch();
  const [cumRapValue, setCumRapValue] = React.useState();
  const showtimeByMaPhimFromSession = React.useMemo(
    () => JSON.parse(sessionStorage.getItem("showtimeByMaPhim")),
    []
  );
  const { maPhim, tenPhim } = showtimeByMaPhimFromSession;
  const createShowtimeInfo = React.useMemo(
    () => ({
      maPhim: maPhim,
      ngayChieu: toYMD(toDMY(new Date())),
      gioChieu: "00:00:00",
      maRap: 0,
      giaVe: 0,
    }),
    [maPhim]
  );
  const theaterSystemList = useSelector(
    (state) => state.theater.theaterSystemList
  );
  const theaterList = useSelector((state) => state.theater.theaterList);
  const chosenTheaterFromSession = React.useMemo(
    () => JSON.parse(sessionStorage.getItem("chosenTheater")),
    []
  );

  const sortMaHeThongRap = React.useCallback((theaterList) => {
    return theaterList.sort((a, b) => {
      const maA = a.maHeThongRap.toUpperCase();
      const maB = b.maHeThongRap.toUpperCase();
      if (maA < maB) return -1;
      if (maA > maB) return 1;
      return 0;
    });
  }, []);

  const danhSachRap = React.useMemo(() => {
    if (chosenTheaterFromSession?.danhSachRap?.length)
      return chosenTheaterFromSession.danhSachRap;
    else {
      if (!theaterList.length || !cumRapValue) return;
      const getRapData = (data) => {
        return [
          data.slice(0, data.indexOf("/")),
          data.slice(data.indexOf("/") + 1),
        ];
      };
      const maHeThongRap = getRapData(cumRapValue)[0];
      const maCumRap = getRapData(cumRapValue)[1];
      const heThongRap = theaterList.find(
        (theater) => theater.maHeThongRap === maHeThongRap
      );
      const cumRap = heThongRap?.theaters.find(
        (theater) => theater.maCumRap === maCumRap
      );
      return cumRap?.danhSachRap;
    }
  }, [chosenTheaterFromSession, theaterList, cumRapValue]);

  const handleCreateShowtime = React.useCallback(
    (values, { resetForm }) => {
      const ngayChieuGioChieu = values.ngayChieu + "T" + values.gioChieu;
      values.ngayChieuGioChieu = ngayChieuGioChieu;
      delete values.ngayChieu;
      delete values.gioChieu;

      console.log(values);
      resetForm(createShowtimeInfo);
    },
    [createShowtimeInfo]
  );

  const handleChangeCumRap = React.useCallback((event) => {
    setCumRapValue(event.target.value);
  }, []);

  const renderCumRap = React.useCallback(() => {
    return (
      theaterSystemList.length &&
      theaterList.length &&
      sortMaHeThongRap(theaterList).map((item, index) => (
        <optgroup label={item.maHeThongRap} key={index}>
          {item.theaters.map((theater, index) => (
            <option
              value={item.maHeThongRap + "/" + theater.maCumRap}
              key={index}
            >
              {theater.tenCumRap}
            </option>
          ))}
        </optgroup>
      ))
    );
  }, [theaterSystemList, theaterList, sortMaHeThongRap]);

  const renderDanhSachRap = React.useCallback(() => {
    const tenCumRap =
      chosenTheaterFromSession && chosenTheaterFromSession.tenCumRap;
    return (
      danhSachRap &&
      danhSachRap.map((rap, index) => (
        <option value={rap.maRap} key={index}>
          {tenCumRap} &#9733; {rap.tenRap} ({rap.maRap})
        </option>
      ))
    );
  }, [danhSachRap, chosenTheaterFromSession]);

  React.useEffect(() => {
    if (!chosenTheaterFromSession) dispatch(setTheaterSystemList());
  }, [chosenTheaterFromSession, dispatch]);

  React.useEffect(() => {
    if (!chosenTheaterFromSession && theaterSystemList.length) {
      theaterSystemList.forEach((system) => {
        dispatch(setTheaterList(system.maHeThongRap));
      });
    }
  }, [chosenTheaterFromSession, theaterSystemList, dispatch]);

  React.useEffect(() => {
    !cumRapValue &&
      new Promise((resolve) => {
        resolve(sortMaHeThongRap(theaterList));
      }).then((theaterList) => {
        theaterList.length &&
          setCumRapValue(
            theaterList[0].maHeThongRap +
              "/" +
              theaterList[0].theaters[0].maCumRap
          );
      });
  }, [cumRapValue, sortMaHeThongRap, theaterList]);

  return (
    <Formik
      initialValues={createShowtimeInfo}
      validationSchema={CreateShowtimeSchema}
      onSubmit={handleCreateShowtime}
    >
      {({ errors, touched, values, isValid }) => (
        <Form className={classes.root}>
          <Grid container>
            <Grid item container md={6}>
              <Grid item container alignItems="center">
                <label htmlFor="maPhim">Phim:</label>
                {errors.maPhim && touched.maPhim && (
                  <ErrorMessage message={errors.maPhim} />
                )}
              </Grid>
              <input disabled id="maPhim" value={tenPhim + ` (${maPhim})`} />
            </Grid>
            <Grid item container md={6}>
              <Grid item container alignItems="center">
                <label htmlFor="giaVe">Giá vé:</label>
                {errors.giaVe && touched.giaVe && (
                  <ErrorMessage message={errors.giaVe} />
                )}
              </Grid>
              <Field id="giaVe" name="giaVe" placeholder="Giá vé..." />
            </Grid>
            {!chosenTheaterFromSession && (
              <Grid item container md={6}>
                <Grid item container alignItems="center">
                  <label htmlFor="cumRap">Cụm rạp:</label>
                </Grid>
                <select
                  value={cumRapValue}
                  id="cumRap"
                  name="cumRap"
                  onChange={handleChangeCumRap}
                >
                  {renderCumRap()}
                </select>
              </Grid>
            )}
            <Grid item container md={6}>
              <Grid item container alignItems="center">
                <label htmlFor="maRap">Rạp:</label>
                {errors.maRap && touched.maRap && (
                  <ErrorMessage message={errors.maRap} />
                )}
              </Grid>
              <Field as="select" id="maRap" name="maRap">
                {renderDanhSachRap()}
              </Field>
            </Grid>
            <Grid item container md={6}>
              <Grid item container alignItems="center">
                <label htmlFor="ngayChieu">Ngày chiếu:</label>
                {errors.ngayChieu && touched.ngayChieu && (
                  <ErrorMessage message={errors.ngayChieu} />
                )}
              </Grid>
              <Field id="ngayChieu" name="ngayChieu" type="date" />
            </Grid>
            <Grid item container md={6}>
              <Grid item container alignItems="center">
                <label htmlFor="gioChieu">Giờ chiếu</label>
                {errors.gioChieu && touched.gioChieu && (
                  <ErrorMessage message={errors.gioChieu} />
                )}
              </Grid>
              <Field id="gioChieu" name="gioChieu" type="time" />
            </Grid>
          </Grid>
          <Box className={classes.button}>
            <CreateButton
              text="THÊM"
              disabled={
                !!(
                  !values.maPhim ||
                  !values.ngayChieu ||
                  !values.gioChieu ||
                  !values.maRap ||
                  !values.giaVe
                ) || !isValid
              }
            />
          </Box>
        </Form>
      )}
    </Formik>
  );
};

export default CreateShowtimeForm;
