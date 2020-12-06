import { Box, CircularProgress, Grid, makeStyles } from "@material-ui/core";
import { Field, Form, Formik } from "formik";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { CreateShowtimeSchema } from "../../formik/schema";
import { createShowtime } from "../../redux/actions/showtimeActions";
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
  loader: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
    height: 602,
  },
  circularProgress: {
    color: theme.palette.warning.main,
  },
});

const CreateShowtimeForm = (props) => {
  const classes = useStyle();
  const dispatch = useDispatch();
  const [cumRapValue, setCumRapValue] = React.useState("");
  const [rapValue, setRapValue] = React.useState("");
  const showtimeByMaPhimFromSession = React.useMemo(
    () => JSON.parse(sessionStorage.getItem("showtimeByMaPhim")),
    []
  );
  const { maPhim, tenPhim } = showtimeByMaPhimFromSession;
  const theaterSystemList = useSelector(
    (state) => state.theater.theaterSystemList
  );
  const theaterList = useSelector((state) => state.theater.theaterList);
  const danhSachRap = React.useMemo(() => {
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
  }, [theaterList, cumRapValue]);
  const createShowtimeInfo = React.useMemo(() => {
    if (!maPhim || !danhSachRap || !rapValue) return;
    return {
      maPhim: maPhim,
      ngayChieu: toYMD(toDMY(new Date())),
      gioChieu: "00:00:00",
      maRap: rapValue,
      giaVe: 0,
    };
  }, [maPhim, danhSachRap, rapValue]);

  const handleCreateShowtime = React.useCallback(
    (values, { resetForm }) => {
      const ngayChieuGioChieu = (
        toDMY(new Date(values.ngayChieu)) +
        " " +
        values.gioChieu +
        (values.gioChieu.length === 5 ? ":00" : "")
      ).replace(/-/g, "/");
      const clone = { ...values };
      clone.ngayChieuGioChieu = ngayChieuGioChieu;
      clone.maRap = +clone.maRap;
      clone.giaVe = +clone.giaVe;
      delete clone.ngayChieu;
      delete clone.gioChieu;

      dispatch(createShowtime(clone, () => resetForm(createShowtimeInfo)));
    },
    [dispatch, createShowtimeInfo]
  );

  const handleChangeCumRap = React.useCallback(async (event, setFieldValue) => {
    setCumRapValue(event.target.value);
    await setFieldValue("cumRap", event.target.value);
    setFieldValue("maRap", +document.getElementById("maRap").value);
  }, []);

  const handleChangeRap = React.useCallback((event, setFieldValue) => {
    setRapValue(+event.target.value);
    setFieldValue("maRap", +document.getElementById("maRap").value);
  }, []);

  const renderCumRap = React.useCallback(
    () =>
      theaterSystemList.length &&
      theaterList.length &&
      theaterList.map((item, index) => (
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
      )),
    [theaterSystemList, theaterList]
  );

  const renderDanhSachRap = React.useCallback(() => {
    if (!danhSachRap || !danhSachRap.length) return;
    return danhSachRap.map((rap, index) => (
      <option value={+rap.maRap} key={index}>
        {rap.tenRap} &#9733; ({rap.maRap})
      </option>
    ));
  }, [danhSachRap]);

  React.useEffect(() => {
    if (!theaterSystemList.length) dispatch(setTheaterSystemList());
  }, [theaterSystemList.length, dispatch]);

  React.useEffect(() => {
    if (theaterSystemList.length && !theaterList.length) {
      theaterSystemList.forEach((system) => {
        dispatch(setTheaterList(system.maHeThongRap));
      });
    }
  }, [theaterSystemList, theaterList, dispatch]);

  React.useEffect(() => {
    if (!theaterList.length) return;
    const chosenTheaterSystemFromSession = JSON.parse(
      sessionStorage.getItem("chosenTheaterSystem")
    );
    const chosenTheaterFromSession = JSON.parse(
      sessionStorage.getItem("chosenTheater")
    );
    if (!chosenTheaterSystemFromSession && !chosenTheaterFromSession)
      setCumRapValue(
        theaterList[0].maHeThongRap + "/" + theaterList[0].theaters[0].maCumRap
      );
    else
      setCumRapValue(
        chosenTheaterSystemFromSession.maHeThongRap +
          "/" +
          chosenTheaterFromSession.maCumRap
      );
  }, [theaterList]);

  React.useEffect(() => {
    if (danhSachRap) setRapValue(danhSachRap[0].maRap);
  }, [danhSachRap]);

  return (
    <>
      {!createShowtimeInfo ? (
        <Box className={classes.loader}>
          <CircularProgress className={classes.circularProgress} size={80} />
        </Box>
      ) : (
        <Formik
          initialValues={createShowtimeInfo}
          validationSchema={CreateShowtimeSchema}
          onSubmit={handleCreateShowtime}
        >
          {({ errors, dirty, touched, values, isValid, setFieldValue }) => (
            <Form className={classes.root}>
              <Grid container>
                <Grid item container md={6}>
                  <Grid item container alignItems="center">
                    <label htmlFor="maPhim">Phim:</label>
                  </Grid>
                  <input
                    disabled
                    id="maPhim"
                    value={tenPhim + ` (${maPhim})`}
                  />
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
                <Grid item container md={6}>
                  <Grid item container alignItems="center">
                    <label htmlFor="cumRap">Cụm rạp:</label>
                  </Grid>
                  <Field
                    as="select"
                    id="cumRap"
                    name="cumRap"
                    onChange={(event) =>
                      handleChangeCumRap(event, setFieldValue)
                    }
                    value={cumRapValue}
                  >
                    {renderCumRap()}
                  </Field>
                </Grid>
                <Grid item container md={6}>
                  <Grid item container alignItems="center">
                    <label htmlFor="maRap">Rạp:</label>
                    {errors.maRap && touched.maRap && (
                      <ErrorMessage message={errors.maRap} />
                    )}
                  </Grid>
                  <Field
                    as="select"
                    id="maRap"
                    name="maRap"
                    onChange={(event) => handleChangeRap(event, setFieldValue)}
                    value={rapValue}
                  >
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
                    ) ||
                    !isValid ||
                    !dirty
                  }
                />
              </Box>
            </Form>
          )}
        </Formik>
      )}
    </>
  );
};

export default CreateShowtimeForm;
