import { createAction } from "./actionCreator";
import { SET_MESSAGE_BOX } from "./actionTypes";

export const setMessageBox = (messageBox) => {
  return (dispatch) => {
    dispatch(createAction(SET_MESSAGE_BOX, messageBox));
  };
};
