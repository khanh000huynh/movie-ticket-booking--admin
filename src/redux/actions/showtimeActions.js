import connector from "../../configs/connector";
import { createAction } from "./actionCreator";
import {
  SET_IS_FINISHED_LOADING_SHOWTIME,
  SET_SHOWTIME,
  SET_SHOWTIME_BY_MAPHIM,
} from "./actionTypes";
import { setMessageBox } from "./pageAction";

export const createShowtime = (createShowtimeInfo, resetForm) => {
  return (dispatch) => {
    connector({
      url: "https://movie0706.cybersoft.edu.vn/api/QuanLyDatVe/TaoLichChieu",
      method: "POST",
      data: createShowtimeInfo,
    })
      .then(() => {
        dispatch(
          setMessageBox({
            isOpened: true,
            message: "Đã thêm lịch chiếu mới!",
            type: "success",
          })
        );
        resetForm();
      })
      .catch((err) => {
        dispatch(
          setMessageBox({
            isOpened: true,
            message: err.response.data,
            type: "error",
          })
        );
      });
  };
};

export const setIsFinishedLoadingShowtime = (isFinished) => {
  return (dispatch) => {
    dispatch(createAction(SET_IS_FINISHED_LOADING_SHOWTIME, isFinished));
  };
};

export const setShowtime = (maPhim) => {
  return (dispatch) => {
    connector({
      url: `https://movie0706.cybersoft.edu.vn/api/QuanLyPhim/LayThongTinPhim?MaPhim=${maPhim}`,
      method: "GET",
    })
      .then((res) => {
        const { maPhim, lichChieu } = res.data;
        const result = { maPhim, lichChieu };
        dispatch(createAction(SET_SHOWTIME, result));
      })
      .catch((err) => {
        console.log(err);
      });
  };
};

export const setShowtimeByMaPhim = (maPhim) => {
  return (dispatch) => {
    connector({
      url: `https://movie0706.cybersoft.edu.vn/api/QuanLyRap/LayThongTinLichChieuPhim?MaPhim=${maPhim}`,
      method: "GET",
    })
      .then((res) => {
        dispatch(createAction(SET_SHOWTIME_BY_MAPHIM, res.data));
      })
      .catch((err) => console.log(err));
  };
};
