import connector from "../../configs/connector";
import { createAction } from "./actionCreator";
import { CHOOSE_MOVIE, SET_MOVIE_LIST, SET_SHOWING } from "./actionTypes";

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
  return () => {
    connector({
      url:
        "https://movie0706.cybersoft.edu.vn/api/QuanLyPhim/ThemPhimUploadHinh",
      method: "POST",
      data: formData,
    })
      .then(() => {
        alert("Đã thêm 1 phim mới!");
      })
      .catch((err) => {
        alert(err.response.data);
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
        alert(
          `Đã cập nhật phim "${formData.get("tenPhim")}" (${formData.get(
            "maPhim"
          )})`
        );
        dispatch(setMovieList());
        console.log(res.data);
      })
      .catch((err) => {
        alert("Xảy ra lỗi!");
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
        alert(`Đã xóa phim "${tenPhim}" (${maPhim})!`);
        dispatch(setMovieList());
      })
      .catch((err) => {
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
