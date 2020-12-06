import { Box, Grid, makeStyles } from "@material-ui/core";
import { Field, Form, Formik } from "formik";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { withRouter } from "react-router-dom";
import { UpdateUserSchema } from "../../formik/schema";
import { logIn } from "../../redux/actions/adminActions";
import {
  setSearchedAccount,
  updateUser,
} from "../../redux/actions/userActions";
import theme from "../../theme/theme";
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
    "& textarea": {
      fontFamily: "inherit",
      fontSize: "1rem",
      width: "100%",
      height: 80,
      margin: theme.spacing(0, 2),
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
        backgroundColor: theme.palette.grey[200],
      },
    },
  },
  button: {
    margin: theme.spacing(2),
    "& button": {
      width: "100%",
    },
  },
});

const UpdateUserForm = (props) => {
  const classes = useStyle();
  const dispatch = useDispatch();
  const admin = useSelector((state) => state.admin.credential);
  const searchedAccount = useSelector((state) => state.user.searchedAccount);
  const userInfo = React.useMemo(() => {
    if (!searchedAccount) return;
    return {
      taiKhoan: searchedAccount.taiKhoan,
      matKhau: searchedAccount.matKhau || "",
      email: searchedAccount.email,
      soDt: searchedAccount.soDt,
      maNhom: "GP01",
      maLoaiNguoiDung: searchedAccount.maLoaiNguoiDung,
      hoTen: searchedAccount.hoTen,
    };
  }, [searchedAccount]);

  const handleUpdateUser = React.useCallback(
    (values) => {
      dispatch(updateUser(values));
      if (admin.taiKhoan === values.taiKhoan) {
        setTimeout(() => {
          dispatch(
            logIn({
              taiKhoan: values.taiKhoan,
              matKhau: values.matKhau,
            })
          );
        }, 800);
      }
    },
    [admin.taiKhoan, dispatch]
  );

  React.useEffect(() => {
    const taiKhoanInput = document.getElementById("taiKhoan");
    taiKhoanInput &&
      taiKhoanInput.addEventListener("keydown", (event) =>
        event.preventDefault()
      );
  }, []);

  React.useEffect(() => {
    const taiKhoanFromSession = sessionStorage.getItem("taiKhoan");
    if (taiKhoanFromSession) dispatch(setSearchedAccount(taiKhoanFromSession));
  }, [dispatch]);

  React.useEffect(() => {
    sessionStorage.setItem("currentPathname", props.location.pathname);
  }, [props.location.pathname]);
  return (
    <>
      {userInfo && userInfo.taiKhoan && (
        <Formik
          initialValues={userInfo}
          validationSchema={UpdateUserSchema}
          onSubmit={handleUpdateUser}
        >
          {({ errors, touched, values, isValid, dirty }) => (
            <Form className={classes.root}>
              <Grid container>
                <Grid item container md={6}>
                  <Grid item container alignItems="center">
                    <label htmlFor="taiKhoan">Tài khoản:</label>
                    {errors.taiKhoan && touched.taiKhoan && (
                      <ErrorMessage message={errors.taiKhoan} />
                    )}
                  </Grid>
                  <input
                    disabled
                    id="taiKhoan"
                    value={props.match.params.taiKhoan}
                    placeholder={props.match.params.taiKhoan}
                  />
                </Grid>
                <Grid item container md={6}>
                  <Grid item container alignItems="center">
                    <label htmlFor="matKhau">Mật khẩu:</label>
                    {errors.matKhau && touched.matKhau && (
                      <ErrorMessage message={errors.matKhau} />
                    )}
                  </Grid>
                  <Field
                    id="matKhau"
                    name="matKhau"
                    placeholder="Mật khẩu..."
                    type="password"
                  />
                </Grid>
                <Grid item container md={6}>
                  <Grid item container alignItems="center">
                    <label htmlFor="hoTen">Họ tên:</label>
                    {errors.hoTen && touched.hoTen && (
                      <ErrorMessage message={errors.hoTen} />
                    )}
                  </Grid>
                  <Field id="hoTen" name="hoTen" placeholder="Họ tên..." />
                </Grid>
                <Grid item container md={6}>
                  <Grid item container alignItems="center">
                    <label htmlFor="email">Email:</label>
                    {errors.email && touched.email && (
                      <ErrorMessage message={errors.email} />
                    )}
                  </Grid>
                  <Field
                    id="email"
                    name="email"
                    placeholder="Email..."
                    type="email"
                  />
                </Grid>
                <Grid item container md={6}>
                  <Grid item container alignItems="center">
                    <label htmlFor="soDt">Số điện thoại:</label>
                    {errors.soDt && touched.soDt && (
                      <ErrorMessage message={errors.soDt} />
                    )}
                  </Grid>
                  <Field id="soDt" name="soDt" placeholder="Số điện thoại..." />
                </Grid>
                <Grid item container md={6}>
                  <Grid item container alignItems="center">
                    <label htmlFor="maLoaiNguoiDung">Loại người dùng:</label>
                    {errors.maLoaiNguoiDung && touched.maLoaiNguoiDung && (
                      <ErrorMessage message={errors.maLoaiNguoiDung} />
                    )}
                  </Grid>
                  <Field
                    as="select"
                    id="maLoaiNguoiDung"
                    name="maLoaiNguoiDung"
                  >
                    <option value="KhachHang">Khách Hàng</option>
                    <option value="QuanTri">Quản trị</option>
                  </Field>
                </Grid>
              </Grid>
              <Box className={classes.button}>
                <CreateButton
                  text="CẬP NHẬT"
                  disabled={
                    !!(
                      !values.taiKhoan ||
                      !values.email ||
                      !values.soDt ||
                      !values.hoTen
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

export default withRouter(UpdateUserForm);
