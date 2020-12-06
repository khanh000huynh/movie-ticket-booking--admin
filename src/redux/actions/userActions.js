import connector from "../../configs/connector";
import { createAction } from "./actionCreator";
import { SET_SEARCHED_ACCOUNT, SET_USER_LIST } from "./actionTypes";
import { setMessageBox } from "./pageAction";

export const setUserList = () => {
  return (dispatch) => {
    connector({
      url:
        "https://movie0706.cybersoft.edu.vn/api/QuanLyNguoiDung/LayDanhSachNguoiDung?MaNhom=GP01",
      method: "GET",
    })
      .then((res) => {
        dispatch(createAction(SET_USER_LIST, res.data));
      })
      .catch((err) => {
        console.log(err);
      });
  };
};

export const createUser = (user) => {
  return (dispatch) => {
    connector({
      url:
        "https://movie0706.cybersoft.edu.vn/api/QuanLyNguoiDung/ThemNguoiDung",
      method: "POST",
      data: user,
    })
      .then(() => {
        dispatch(
          setMessageBox({
            isOpened: true,
            message: "Đã thêm 1 người dùng mới!",
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

export const updateUser = (user) => {
  return (dispatch) => {
    connector({
      url:
        "https://movie0706.cybersoft.edu.vn/api/QuanLyNguoiDung/CapNhatThongTinNguoiDung",
      method: "PUT",
      data: user,
    })
      .then(() => {
        dispatch(
          setMessageBox({
            isOpened: true,
            message: `Đã cập nhật tài khoản "${user.taiKhoan}"!`,
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

export const deleteUser = (taiKhoan) => {
  return (dispatch) => {
    connector({
      url: `https://movie0706.cybersoft.edu.vn/api/QuanLyNguoiDung/XoaNguoiDung?TaiKhoan=${taiKhoan}`,
      method: "DELETE",
    })
      .then(() => {
        dispatch(
          setMessageBox({
            isOpened: true,
            message: `Đã xoá tài khoản "${taiKhoan}"`,
            type: "success",
          })
        );
        dispatch(setUserList());
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

export const setSearchedAccount = (taiKhoan) => {
  return (dispatch) => {
    connector({
      url: `https://movie0706.cybersoft.edu.vn/api/QuanLyNguoiDung/TimKiemNguoiDung?MaNhom=GP01&tuKhoa=${taiKhoan}`,
      method: "GET",
    })
      .then((res) => {
        dispatch(createAction(SET_SEARCHED_ACCOUNT, res.data[0]));
      })
      .catch((err) => {
        console.log(err);
      });
  };
};
