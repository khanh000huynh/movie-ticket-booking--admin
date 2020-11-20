import React from "react";
import { useDispatch } from "react-redux";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import CreateMoviePage from "./pages/CreateMoviePage/CreateMoviePage";
import CreateShowtimePage from "./pages/CreateShowtimePage/CreateShowtimePage";
import CreateUserPage from "./pages/CreateUserPage/CreateUserPage";
import DetailShowtimePage from "./pages/DetailShowtimePage/DetailShowtimePage";
import HomePage from "./pages/HomePage/HomePage";
import MovieManagementPage from "./pages/MovieManagementPage/MovieManagementPage";
import PrivateRoute from "./pages/PrivateRoute";
import ShowtimeManagementPage from "./pages/ShowtimeManagementPage/ShowtimeManagementPage";
import UpdateMoviePage from "./pages/UpdateMoviePage/UpdateMoviePage";
import UpdateUserPage from "./pages/UpdateUserPage/UpdateUserPage";
import UserManagementPage from "./pages/UserManagementPage/UserManagementPage";
import WithHeaderAndDashboard from "./pages/WithHeaderAndDashboard/WithHeaderAndDashboard";
import { createAction } from "./redux/actions/actionCreator";
import { SET_CREDENTIAL } from "./redux/actions/actionTypes";

const App = () => {
  const dispatch = useDispatch();
  const credential = React.useMemo(() => {
    return localStorage.getItem("credential")
      ? JSON.parse(localStorage.getItem("credential"))
      : null;
  }, []);
  const token = React.useMemo(() => {
    return credential ? credential.accessToken : null;
  }, [credential]);

  React.useEffect(() => {
    if (token) dispatch(createAction(SET_CREDENTIAL, credential));
  }, [token, dispatch, credential]);

  return (
    <BrowserRouter>
      <Switch>
        <Route path="/" component={HomePage} exact />
        <WithHeaderAndDashboard>
          <PrivateRoute
            path="/movie-management/create-movie"
            component={CreateMoviePage}
          />
          <PrivateRoute
            path="/movie-management/update-movie/:maPhim"
            component={UpdateMoviePage}
          />
          <PrivateRoute
            path="/movie-management"
            component={MovieManagementPage}
            exact
          />
          <PrivateRoute
            path="/user-management/create-user"
            component={CreateUserPage}
          />
          <PrivateRoute
            path="/user-management/update-user/:taiKhoan"
            component={UpdateUserPage}
          />
          <PrivateRoute
            path="/user-management"
            component={UserManagementPage}
            exact
          />
          <PrivateRoute
            path="/showtime-management/detail-showtime/:maPhim"
            component={DetailShowtimePage}
          />
          <PrivateRoute
            path="/showtime-management/create-showtime/:maPhim"
            component={CreateShowtimePage}
          />
          <PrivateRoute
            path="/showtime-management"
            component={ShowtimeManagementPage}
            exact
          />
        </WithHeaderAndDashboard>
      </Switch>
    </BrowserRouter>
  );
};

export default App;
