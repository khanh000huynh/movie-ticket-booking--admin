import connector from "../../configs/connector";
import { createAction } from "./actionCreator";
import { CHOOSE_MOVIE, SET_MOVIE_LIST, SET_SHOWING } from "./actionTypes";
import { setMessageBox } from "./pageAction";

export const setMovieList = () => {
  return (dispatch) => {
    connector({
      url:
        "https://movie0706.cybersoft.edu.vn/api/QuanLyPhim/LayDanhSachPhim?maNhom=GP10",
      method: "GET",
    })
      .then((res) => dispatch(createAction(SET_MOVIE_LIST, res.data)))
      .catch((err) => console.log(err));
  };
};

export const chooseMovie = (movie) => {
  return (dispatch) => dispatch(createAction(CHOOSE_MOVIE, movie));
};

export const createMovie = (formData) => {
  return (dispatch) => {
    connector({
      url:
        "https://movie0706.cybersoft.edu.vn/api/QuanLyPhim/ThemPhimUploadHinh",
      method: "POST",
      data: formData,
    })
      .then(() => {
        dispatch(
          setMessageBox({
            isOpened: true,
            message: "Đã thêm 1 phim mới!",
            type: "success",
          })
        );
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

export const updateMovie = (formData) => {
  return (dispatch) => {
    connector({
      url:
        "https://movie0706.cybersoft.edu.vn/api/QuanLyPhim/CapNhatPhimUpload",
      method: "POST",
      data: formData,
    })
      .then((res) => {
        dispatch(
          setMessageBox({
            isOpened: true,
            message: `Đã cập nhật phim "${formData.get(
              "tenPhim"
            )}" (${formData.get("maPhim")})`,
            type: "info",
          })
        );
        dispatch(setMovieList());
      })
      .catch((err) => {
        dispatch(
          setMessageBox({
            isOpened: true,
            message: `Xảy ra lỗi! (${err.response.status})`,
            type: "error",
          })
        );
        console.log(err);
      });
  };
};

export const deleteMovie = (info) => {
  const { maPhim, tenPhim } = info;

  return (dispatch) => {
    connector({
      url: `https://movie0706.cybersoft.edu.vn/api/QuanLyPhim/XoaPhim?MaPhim=${maPhim}`,
      method: "DELETE",
    })
      .then(() => {
        dispatch(
          setMessageBox({
            isOpened: true,
            message: `Đã xóa phim "${tenPhim}" (${maPhim})!`,
            type: "success",
          })
        );
        dispatch(setMovieList());
      })
      .catch((err) => {
        dispatch(
          setMessageBox({
            isOpened: true,
            message: err.response.data,
            type: "error",
          })
        );
        console.log(err);
      });
  };
};

export const setShowing = (maHeThongRap) => {
  return (dispatch) => {
    connector({
      url: `https://movie0706.cybersoft.edu.vn/api/QuanLyRap/LayThongTinLichChieuHeThongRap?maHeThongRap=${maHeThongRap}&maNhom=GP10`,
      method: "GET",
    })
      .then((res) => {
        dispatch(createAction(SET_SHOWING, res.data));
      })
      .catch((err) => console.log(err));
  };
};
