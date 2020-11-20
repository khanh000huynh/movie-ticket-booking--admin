import { Avatar, Link } from "@material-ui/core";
import React from "react";
import { withRouter } from "react-router-dom";
import logo from "../../assets/img/web-logo.png";

const Logo = (props) => {
  const handleRedirectToHomePage = React.useCallback(() => {
    props.history.push("/movie-management");
  }, [props.history]);

  return (
    <Link style={{ cursor: "pointer" }} onClick={handleRedirectToHomePage}>
      <Avatar
        style={{ width: 50, height: 50 }}
        src={logo}
        alt="logo"
        variant="square"
      />
    </Link>
  );
};

export default withRouter(Logo);
