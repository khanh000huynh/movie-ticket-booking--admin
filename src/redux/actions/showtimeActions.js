import connector from "../../configs/connector";
import { createAction } from "./actionCreator";
import {
  SET_IS_FINISHED_LOADING_SHOWTIME,
  SET_SHOWTIME,
  SET_SHOWTIME_BY_MAPHIM,
} from "./actionTypes";

export const createShowtime = (createShowtimeInfo) => {
  connector({
    url: "https://movie0706.cybersoft.edu.vn/api/QuanLyDatVe/TaoLichChieu",
    method: "POST",
    data: createShowtimeInfo,
  })
    .then((res) => {
      console.log(res.data);
      alert("Đã thêm lịch chiếu mới!");
    })
    .then((err) => {
      alert(err.response.data);
    });
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
