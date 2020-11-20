import { CardMedia, makeStyles, Tooltip } from "@material-ui/core";
import classnames from "classnames";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { chooseTheaterSystem } from "../../redux/actions/theaterActions";
import theme from "../../theme/theme";

const useStyles = makeStyles({
  media: {
    cursor: "pointer",
    width: 50,
    height: 50,
    marginRight: theme.spacing(2),
  },
  blur: {
    opacity: 0.3,
    "&:hover": {
      opacity: 1,
    },
  },
});

const TheaterSystem = (props) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const chosenTheaterSystem = useSelector(
    (state) => state.theater.chosenTheaterSystem
  );
  const { system } = props;
  const { logo, maHeThongRap, tenHeThongRap } = system;

  const hasBlurEffect = React.useCallback(() => {
    if (chosenTheaterSystem.maHeThongRap === maHeThongRap) return "";
    return classes.blur;
  }, [chosenTheaterSystem.maHeThongRap, maHeThongRap, classes.blur]);

  const handleChooseTheaterSystem = React.useCallback(
    (system) => () => {
      if (!chosenTheaterSystem) return;
      dispatch(chooseTheaterSystem(system));
    },
    [dispatch, chosenTheaterSystem]
  );

  return (
    <Tooltip
      title={tenHeThongRap}
      placement="top"
      onClick={handleChooseTheaterSystem(system)}
    >
      <CardMedia
        image={logo}
        className={classnames(classes.media, hasBlurEffect())}
      />
    </Tooltip>
  );
};

export default TheaterSystem;
