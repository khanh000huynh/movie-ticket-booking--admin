import React from "react";
import { withRouter } from "react-router-dom";
import ContentHeader from "../../components/ContentHeader/ContentHeader";
import CreateShowtimeForm from "../../components/CreateShowtimeForm/CreateShowtimeForm";

const CreateShowtimePage = (props) => {
  React.useEffect(() => {
    sessionStorage.setItem("currentPathname", props.location.pathname);
  }, [props.location.pathname]);

  return (
    <div>
      <ContentHeader
        prevPath={`/showtime-management/detail-showtime/${props.match.params.maPhim}`}
        title="THÊM LỊCH CHIẾU"
      />
      <CreateShowtimeForm maPhim={props.match.params.maPhim} />
    </div>
  );
};

export default withRouter(CreateShowtimePage);
