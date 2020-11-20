import {
  SET_IS_FINISHED_LOADING_SHOWTIME,
  SET_SHOWTIME,
  SET_SHOWTIME_BY_MAPHIM,
} from "../actions/actionTypes";

let initialState = {
  isFinishedLoading: null,
  showtime: [],
  showtimeByMaPhim: {},
};

export const showtimeReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case SET_IS_FINISHED_LOADING_SHOWTIME: {
      return { ...state, isFinishedLoading: payload };
    }
    case SET_SHOWTIME: {
      const clone = [...state.showtime];
      if (!clone.includes(payload.maPhim)) clone.push(payload);
      return { ...state, showtime: clone };
    }
    case SET_SHOWTIME_BY_MAPHIM: {
      const chosenTheaterSystemFromSession = JSON.parse(
        sessionStorage.getItem("chosenTheaterSystem")
      );
      const chosenTheaterFromSession = JSON.parse(
        sessionStorage.getItem("chosenTheater")
      );
      if (chosenTheaterSystemFromSession && chosenTheaterFromSession) {
        const heThongRapChieu = payload.heThongRapChieu.find(
          (rap) =>
            rap.maHeThongRap === chosenTheaterSystemFromSession.maHeThongRap
        );
        const lichChieuPhim = heThongRapChieu.cumRapChieu.find(
          (rap) => rap.maCumRap === chosenTheaterFromSession.maCumRap
        ).lichChieuPhim;
        delete payload.heThongRapChieu;
        payload.lichChieuPhim = lichChieuPhim;
      }
      return { ...state, showtimeByMaPhim: payload };
    }
    default:
      return state;
  }
};
