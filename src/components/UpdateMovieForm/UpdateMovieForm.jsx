import { Box, Grid, makeStyles } from "@material-ui/core";
import { Field, Form, Formik } from "formik";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { withRouter } from "react-router-dom";
import { MovieSchema } from "../../formik/schema";
import { chooseMovie, updateMovie } from "../../redux/actions/movieActions";
import theme from "../../theme/theme";
import { toDMY, toYMD } from "../../utils/datetime";
import CreateButton from "../CreateButton/CreateButton";
import ErrorMessage from "../ErrorMessage/ErrorMessage";
import Trailer from "../Trailer/Trailer";

const useStyle = makeStyles({
  root: {
    padding: theme.spacing(2),
    "& .MuiGrid-item, & .MuiFormControl-root": {
      borderBox: "box-sizing",
      margin: theme.spacing(0.5, 0),
      "& > div": {
        paddingLeft: 0,
      },
      "& input": {
        width: "100%",
        height: 40,
        boxSizing: "border-box",
        padding: theme.spacing(0, 1),
      },
      "& input[type=file]": {
        width: "auto",
        paddingLeft: 0,
        paddingTop: theme.spacing(1.25),
        margin: 0,
      },
    },
    "& label": {
      fontWeight: 500,
      marginBottom: theme.spacing(0.5),
    },
    "& textarea": {
      fontFamily: "inherit",
      fontSize: "1rem",
      width: "100%",
      height: 80,
      padding: theme.spacing(1),
      "&:focus": {
        outline: "1.5px solid " + theme.palette.primary.main,
      },
      "&::-webkit-scrollbar": {
        width: 8,
      },
      "&::-webkit-scrollbar-track": {
        backgroundColor: theme.palette.grey[250],
      },
      "&::-webkit-scrollbar-thumb": {
        backgroundColor: theme.palette.grey[150],
      },
    },
    "& img[id=preview_img]": {
      backgroundColor: theme.palette.grey[200],
      objectFit: "contain",
      width: "100%",
      height: "100%",
    },
  },
  button: {
    marginTop: theme.spacing(2),
    "& button": {
      width: "100%",
    },
  },
  hinhAnhGrid: {
    paddingRight: theme.spacing(1),
  },
  imageContainer: {
    backgroundColor: theme.palette.grey[300],
    border: "1px solid " + theme.palette.text.primary,
    position: "relative",
    width: "100%",
    height: 440,
    "&:hover $trailer": {
      opacity: 1,
    },
  },
  trailer: {
    opacity: 0,
    transition: theme.transitions.duration,
  },
  scroll: {
    width: "100%",
    borderLeft: "none",
    maxHeight: "100%",
    paddingLeft: theme.spacing(1),
  },
  w100: {
    width: "100%",
  },
});

const UpdateMovieForm = (props) => {
  const classes = useStyle();
  const dispatch = useDispatch();
  const movie = useSelector((state) => state.movie.chosenMovie);
  const [image, setImage] = React.useState("");
  const movieInfo = React.useMemo(() => {
    if (!movie) return;
    return {
      maPhim: movie.maPhim,
      tenPhim: movie.tenPhim,
      biDanh: movie.biDanh,
      trailer: movie.trailer,
      hinhAnh: movie.hinhAnh,
      moTa: movie.moTa,
      maNhom: movie.maNhom,
      ngayKhoiChieu: toYMD(toDMY(new Date(movie.ngayKhoiChieu))),
      danhGia: movie.danhGia,
    };
  }, [movie]);

  const handleChangeImage = React.useCallback((event, setFieldValue) => {
    const imageFile = event.target.files[0];
    if (!imageFile) return;
    setImage(URL.createObjectURL(imageFile));
    setFieldValue("hinhAnh", imageFile);
  }, []);

  const handleUpdateMovie = React.useCallback(
    (values) => {
      values.ngayKhoiChieu = toDMY(new Date(values.ngayKhoiChieu));
      const formData = new FormData();
      for (let key in values) {
        formData.append(key, values[key]);
      }
      dispatch(updateMovie(formData));
    },
    [dispatch]
  );

  React.useEffect(() => {
    movie.hinhAnh && setImage(movie.hinhAnh);
  }, [movie.hinhAnh]);

  React.useEffect(() => {
    sessionStorage.setItem("currentPathname", props.location.pathname);
  }, [props.location.pathname]);

  React.useEffect(() => {
    const chosenMovie = JSON.parse(sessionStorage.getItem("chosenMovie"));
    if (chosenMovie) dispatch(chooseMovie(chosenMovie));
  }, [dispatch]);

  return (
    <>
      {movie && movie.maPhim && (
        <Formik
          initialValues={movieInfo}
          validationSchema={MovieSchema}
          onSubmit={handleUpdateMovie}
        >
          {({ errors, touched, values, isValid, setFieldValue }) => (
            <Form className={classes.root} spellCheck="false">
              <Grid container>
                <Grid item container xs={6} className={classes.hinhAnhGrid}>
                  <label htmlFor="hinhAnh" className={classes.w100}>
                    Hình ảnh:
                  </label>
                  <div className={classes.imageContainer}>
                    {values.trailer && (
                      <div className={classes.trailer}>
                        <Trailer trailer={values.trailer} />
                      </div>
                    )}
                    <img id="preview_img" src={image} alt="&nbsp;(trống)" />
                  </div>
                  <input
                    accept="image/*"
                    id="hinhAnh"
                    name="hinhAnh"
                    type="file"
                    onChange={(event) =>
                      handleChangeImage(event, setFieldValue)
                    }
                    className={classes.w100}
                  />
                  {errors.hinhAnh && touched.hinhAnh ? (
                    <ErrorMessage message={errors.hinhAnh} />
                  ) : null}
                </Grid>
                <Grid item container xs={6} className={classes.scroll}>
                  <Grid item container xs={12}>
                    <Grid item container alignItems="center">
                      <label htmlFor="ngayKhoiChieu">Ngày khởi chiếu:</label>
                      {errors.ngayKhoiChieu && touched.ngayKhoiChieu && (
                        <ErrorMessage message={errors.ngayKhoiChieu} />
                      )}
                    </Grid>
                    <Field
                      id="ngayKhoiChieu"
                      name="ngayKhoiChieu"
                      type="date"
                    />
                  </Grid>
                  <Grid item container xs={12}>
                    <Grid item container alignItems="center">
                      <label htmlFor="tenPhim">Tên phim:</label>
                      {errors.tenPhim && touched.tenPhim && (
                        <ErrorMessage message={errors.tenPhim} />
                      )}
                    </Grid>
                    <Field
                      id="tenPhim"
                      name="tenPhim"
                      placeholder="Tên phim..."
                    />
                  </Grid>
                  <Grid item container xs={12}>
                    <Grid item container alignItems="center">
                      <label htmlFor="biDanh">Bí danh:</label>
                      {errors.biDanh && touched.biDanh && (
                        <ErrorMessage message={errors.biDanh} />
                      )}
                    </Grid>
                    <Field id="biDanh" name="biDanh" placeholder="Bí danh..." />
                  </Grid>
                  <Grid item container xs={12}>
                    <Grid item container alignItems="center">
                      <label htmlFor="trailer">Trailer:</label>
                      {errors.trailer && touched.trailer && (
                        <ErrorMessage message={errors.trailer} />
                      )}
                    </Grid>
                    <Field
                      id="trailer"
                      name="trailer"
                      placeholder="Trailer..."
                    />
                  </Grid>
                  <Grid item container xs={12}>
                    <Grid item container alignItems="center">
                      <label htmlFor="moTa">Mô tả:</label>
                      {errors.moTa && touched.moTa && (
                        <ErrorMessage message={errors.moTa} />
                      )}
                    </Grid>
                    <Field
                      component="textarea"
                      id="moTa"
                      name="moTa"
                      placeholder="Mô tả..."
                    />
                  </Grid>
                </Grid>
              </Grid>
              <Box className={classes.button}>
                <CreateButton
                  text="CẬP NHẬT"
                  disabled={
                    !!(
                      !values.tenPhim ||
                      !values.biDanh ||
                      !values.trailer ||
                      !values.hinhAnh ||
                      !values.moTa ||
                      !values.ngayKhoiChieu
                    ) || !isValid
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

export default withRouter(UpdateMovieForm);
