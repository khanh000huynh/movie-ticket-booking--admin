import connector from "../../configs/connector";
import { createAction } from "./actionCreator";
import { SET_SEARCHED_ACCOUNT, SET_USER_LIST } from "./actionTypes";

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
  return () => {
    connector({
      url:
        "https://movie0706.cybersoft.edu.vn/api/QuanLyNguoiDung/ThemNguoiDung",
      method: "POST",
      data: user,
    })
      .then(() => {
        alert("Đã thêm 1 người dùng mới!");
      })
      .catch((err) => {
        alert(err.response.data);
      });
  };
};

export const updateUser = (user) => {
  return () => {
    connector({
      url:
        "https://movie0706.cybersoft.edu.vn/api/QuanLyNguoiDung/CapNhatThongTinNguoiDung",
      method: "PUT",
      data: user,
    })
      .then(() => {
        alert(`Đã cập nhật tài khoản "${user.taiKhoan}"`);
      })
      .catch((err) => {
        alert(err.response.data);
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
        alert(`Đã xoá tài khoản "${taiKhoan}"`);
        dispatch(setUserList());
      })
      .catch((err) => {
        alert(err.response.data);
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
