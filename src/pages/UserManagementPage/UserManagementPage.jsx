import { Box, Grid, makeStyles } from "@material-ui/core";
import React from "react";
import { withRouter } from "react-router-dom";
import CreateButton from "../../components/CreateButton/CreateButton";
import Search from "../../components/Search/Search";
import Title from "../../components/Title/Title";
import UserList from "../../components/UserList/UserList";

const useStyles = makeStyles({
  content: {
    margin: "0 auto",
    alignItems: "center",
    justifyContent: "center",
  },
});

const UserManagementPage = (props) => {
  const classes = useStyles();

  const handleRedirectToCreateUserPage = () => {
    props.history.push("/user-management/create-user");
  };

  React.useEffect(() => {
    sessionStorage.setItem("currentPathname", props.location.pathname);
  }, [props.location.pathname]);

  return (
    <>
      <Box
        display="flex"
        alignItems="center"
        justifyContent="space-between"
        mr={2}
      >
        <Title text="DANH SÁCH NGƯỜI DÙNG" />
        <CreateButton
          text="THÊM NGƯỜI DÙNG"
          onClick={handleRedirectToCreateUserPage}
        />
      </Box>
      <Grid container className={classes.content}>
        <Grid item xs={12}>
          <Search />
        </Grid>
        <Grid item xs={12}>
          <UserList />
        </Grid>
      </Grid>
    </>
  );
};

export default withRouter(UserManagementPage);
