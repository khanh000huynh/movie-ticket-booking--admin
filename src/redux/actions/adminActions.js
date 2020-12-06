import connector from "../../configs/connector";
import { setMessageBox } from "../actions/pageAction";
import { createAction } from "./actionCreator";
import { SET_CREDENTIAL, SET_IS_LOGGING_IN } from "./actionTypes";

export const setIsLoggingIn = (isLoggingIn) => {
  return (dispatch) => {
    dispatch(createAction(SET_IS_LOGGING_IN, isLoggingIn));
  };
};

export const logIn = (credential) => {
  return (dispatch) => {
    connector({
      url: "https://movie0706.cybersoft.edu.vn/api/QuanLyNguoiDung/DangNhap",
      method: "POST",
      data: credential,
    })
      .then((res) => {
        setTimeout(() => {
          dispatch(createAction(SET_CREDENTIAL, res.data));
          localStorage.setItem("credential", JSON.stringify(res.data));
          dispatch(setIsLoggingIn(false));
        }, 1000);
      })
      .catch((err) => {
        dispatch(
          setMessageBox({
            isOpened: true,
            message: err.response.data,
            type: "error",
          })
        );
        dispatch(setIsLoggingIn(false));
      });
  };
};
