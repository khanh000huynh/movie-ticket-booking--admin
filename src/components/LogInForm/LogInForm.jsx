import { Box, Button, Grid, makeStyles, Typography } from "@material-ui/core";
import { AccountCircle, LockRounded } from "@material-ui/icons";
import { Field, Form, Formik } from "formik";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { withRouter } from "react-router-dom";
import { LogInSchema } from "../../formik/schema";
import { logIn } from "../../redux/actions/adminActions";
import theme from "../../theme/theme";
import ErrorMessage from "../ErrorMessage/ErrorMessage";

const useStyles = makeStyles({
  root: {
    height: 690,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    padding: theme.spacing(2, 0),
    backgroundImage: "url('https://tix.vn/app/assets/img/icons/bg2.jpg')",
    backgroundSize: "contain",
    [theme.breakpoints.down("sm")]: {
      height: "auto",
      padding: theme.spacing(4, 0),
    },
  },
  form: {
    width: "25%",
    border: "1px solid " + theme.palette.grey[250],
    borderRadius: 4,
    backgroundColor: theme.palette.common.white,
    padding: theme.spacing(2),
    "& label, input": {
      width: "100%",
      height: 26,
      marginLeft: theme.spacing(2),
      padding: theme.spacing(0, 0.5),
      boxSizing: "border-box",
    },
  },
  title: {
    textAlign: "center",
    textTransform: "uppercase",
    marginBottom: theme.spacing(1.5),
  },
  icons: {
    fontSize: "3rem",
    [theme.breakpoints.down("xs")]: {
      fontSize: "1.5rem",
    },
  },
  logInButton: {
    width: "100%",
    height: 40,
    margin: theme.spacing(2, 0),
    backgroundColor: theme.palette.success.main,
    color: theme.palette.common.white,
    transition: theme.transitions.duration,
    "&:hover": {
      backgroundColor: theme.palette.success.light,
    },
  },
});

const LogInForm = (props) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const admin = useSelector((state) => state.admin.credential);

  const handleSubmit = React.useCallback(
    (values) => {
      dispatch(logIn(values));
    },
    [dispatch]
  );

  React.useEffect(() => {
    const currentPathname = sessionStorage.getItem("currentPathname");
    if (admin.accessToken && currentPathname)
      props.history.replace(currentPathname);
    if (admin.accessToken && !currentPathname)
      props.history.replace("/movie-management");
  }, [admin.accessToken, props.history]);

  return (
    <div className={classes.root}>
      <Formik
        initialValues={{
          taiKhoan: "",
          matKhau: "",
        }}
        validationSchema={LogInSchema}
        onSubmit={(values) => handleSubmit(values)}
      >
        {({ errors, touched }) => (
          <Form className={classes.form}>
            <Typography className={classes.title} variant="h5">
              Đăng nhập
            </Typography>
            <Grid container alignItems="center">
              <Grid item container xs={2} alignItems="center">
                <AccountCircle className={classes.icons} />
              </Grid>
              <Grid item container xs={10}>
                <label htmlFor="taiKhoan">Tài khoản</label>
                <Field id="taiKhoan" name="taiKhoan" />
                {errors.taiKhoan && touched.taiKhoan ? (
                  <ErrorMessage message={errors.taiKhoan} />
                ) : (
                  <Box height={17} />
                )}
              </Grid>
              <Grid item container xs={2} alignItems="center">
                <LockRounded className={classes.icons} />
              </Grid>
              <Grid item container xs={10}>
                <label htmlFor="matKhau">Mật khẩu</label>
                <Field id="matKhau" name="matKhau" type="password" />
                {errors.matKhau && touched.matKhau ? (
                  <ErrorMessage message={errors.matKhau} />
                ) : (
                  <Box height={17} />
                )}
              </Grid>
              <Button type="submit" className={classes.logInButton}>
                Đăng nhập
              </Button>
            </Grid>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default withRouter(LogInForm);
