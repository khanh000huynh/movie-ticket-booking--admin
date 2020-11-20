import React from "react";
import { useSelector } from "react-redux";
import { Redirect, Route } from "react-router-dom";

const PrivateRoute = (props) => {
  const { path, component, exact } = props;
  const admin = useSelector((state) => state.admin.credential);
  const adminFromLocalStorage = localStorage.getItem("credential");

  return (
    <div>
      {(admin && admin.accessToken) ||
      (adminFromLocalStorage && adminFromLocalStorage.accessToken) ? (
        <Route path={path} component={component} exact={exact} />
      ) : (
        <Redirect to="/" />
      )}
    </div>
  );
};

export default PrivateRoute;
