import connector from "../../configs/connector";
import { createAction } from "../../redux/actions/actionCreator";
import {
  CHOOSE_THEATER,
  CHOOSE_THEATER_SYSTEM,
  SET_THEATER_LIST,
  SET_THEATER_SYSTEM_LIST,
} from "./actionTypes";

export const chooseTheaterSystem = (system) => {
  return (dispatch) => {
    dispatch(createAction(CHOOSE_THEATER_SYSTEM, system));
  };
};

export const chooseTheater = (theater) => {
  return (dispatch) => {
    dispatch(createAction(CHOOSE_THEATER, theater));
  };
};

export const setTheaterSystemList = () => {
  return (dispatch) => {
    connector({
      url:
        "https://movie0706.cybersoft.edu.vn/api/QuanLyRap/LayThongTinHeThongRap",
      method: "GET",
    })
      .then((res) => {
        dispatch(createAction(SET_THEATER_SYSTEM_LIST, res.data));
        dispatch(createAction(CHOOSE_THEATER_SYSTEM, res.data[0]));
        res.data.forEach((system) => {
          dispatch(setTheaterList(system.maHeThongRap));
        });
      })
      .catch((err) => {
        console.log(err);
      });
  };
};

export const setTheaterList = (maHeThongRap) => {
  return (dispatch) => {
    connector({
      url: `https://movie0706.cybersoft.edu.vn/api/QuanLyRap/LayThongTinCumRapTheoHeThong?maHeThongRap=${maHeThongRap}`,
      method: "GET",
    })
      .then((res) => {
        dispatch(
          createAction(SET_THEATER_LIST, {
            maHeThongRap,
            theaters: res.data,
          })
        );
      })
      .catch((err) => console.log(err));
  };
};
