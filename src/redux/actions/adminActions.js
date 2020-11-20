import connector from "../../configs/connector";
import { createAction } from "./actionCreator";
import { SET_CREDENTIAL } from "./actionTypes";

export const logIn = (credential) => {
  return (dispatch) => {
    connector({
      url: "https://movie0706.cybersoft.edu.vn/api/QuanLyNguoiDung/DangNhap",
      method: "POST",
      data: credential,
    })
      .then((res) => {
        dispatch(createAction(SET_CREDENTIAL, res.data));
        localStorage.setItem("credential", JSON.stringify(res.data));
      })
      .catch((err) => alert(err.response.data));
  };
};
