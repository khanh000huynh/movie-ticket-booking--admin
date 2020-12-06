import { AppBar, Box, Grid, makeStyles, Toolbar } from "@material-ui/core";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { withRouter } from "react-router-dom";
import { createAction } from "../../redux/actions/actionCreator";
import { SET_CREDENTIAL } from "../../redux/actions/actionTypes";
import theme from "../../theme/theme";
import CustomPopover from "../CustomPopover/CustomPopover";
import Logo from "../Logo/logo";

const useStyles = makeStyles({
  root: {
    fontSize: theme.typography.fontSize,
    backgroundColor: theme.palette.common.white,
    fontWeight: 500,
    maxHeight: 64,
    position: "fixed",
    top: 0,
    left: 0,
  },
  divider: {
    marginLeft: theme.spacing(2),
    [theme.breakpoints.down("sm")]: {
      marginLeft: theme.spacing(1),
    },
    [theme.breakpoints.down("xs")]: {
      display: "none",
    },
  },
  navLink: {
    [theme.breakpoints.down("xs")]: {
      display: "none",
    },
  },
  userLink: {
    [theme.breakpoints.down("xs")]: {
      display: "none",
    },
  },
  box: {
    paddingTop: "8rem !important",
  },
});

const Header = (props) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const admin = useSelector((state) => state.admin.credential);

  const handleUpdateInfo = React.useCallback(() => {
    props.history.push(`/user-management/update-user/${admin.taiKhoan}`);
    sessionStorage.setItem("taiKhoan", admin.taiKhoan);
  }, [props.history, admin.taiKhoan]);

  const handleLogOut = React.useCallback(() => {
    localStorage.removeItem("credential");
    sessionStorage.clear();
    dispatch(createAction(SET_CREDENTIAL, {}));
  }, [dispatch]);

  return (
    <>
      <AppBar position="static" elevation={1} className={classes.root}>
        <Toolbar>
          <Grid container alignItems="center" justify="space-between">
            <Grid item>
              <Logo />
            </Grid>
            <Grid item>
              {admin && admin.accessToken ? (
                <CustomPopover
                  content={`Xin chào, ${admin.hoTen}`}
                  dropdownList={[
                    <Box onClick={handleUpdateInfo}>Chỉnh sửa thông tin</Box>,
                    <Box onClick={handleLogOut}>Đăng xuất</Box>,
                  ]}
                />
              ) : null}
            </Grid>
          </Grid>
        </Toolbar>
      </AppBar>
    </>
  );
};

export default withRouter(Header);
