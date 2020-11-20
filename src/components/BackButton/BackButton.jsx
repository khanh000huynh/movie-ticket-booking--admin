import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import React from "react";
import { withRouter } from "react-router-dom";

const BackButton = (props) => {
  const { prevPath } = props;

  const handleGoBack = React.useCallback(() => {
    props.history.push(prevPath);
  }, [props.history, prevPath]);

  return (
    <div onClick={handleGoBack} style={{ cursor: "pointer", marginLeft: 16 }}>
      <ArrowBackIcon />
    </div>
  );
};

export default withRouter(BackButton);
