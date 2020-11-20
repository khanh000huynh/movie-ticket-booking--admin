import { Box, Grid, makeStyles } from "@material-ui/core";
import React from "react";
import { withRouter } from "react-router-dom";
import CreateButton from "../../components/CreateButton/CreateButton";
import MovieList from "../../components/MovieList/MovieList";
import Search from "../../components/Search/Search";
import Title from "../../components/Title/Title";

const useStyles = makeStyles({
  content: {
    margin: "0 auto",
    alignItems: "center",
    justifyContent: "center",
  },
});

const MovieManagementPage = (props) => {
  const classes = useStyles();

  const handleRedirectToCreateMoviePage = React.useCallback(() => {
    props.history.push("/movie-management/create-movie");
  }, [props.history]);

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
        <Title text="DANH SÁCH PHIM" />
        <CreateButton
          text="THÊM PHIM"
          onClick={handleRedirectToCreateMoviePage}
        />
      </Box>
      <Grid container className={classes.content}>
        <Grid item xs={12}>
          <Search />
        </Grid>
        <Grid item xs={12}>
          <MovieList />
        </Grid>
      </Grid>
    </>
  );
};

export default withRouter(MovieManagementPage);
