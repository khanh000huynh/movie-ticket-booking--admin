import { SET_MESSAGE_BOX } from "../actions/actionTypes";

let initialState = {
  messageBox: {
    isOpened: null,
    message: "",
    type: "",
  },
};

export const pageReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case SET_MESSAGE_BOX: {
      return { ...state, messageBox: payload };
    }
    default:
      return state;
  }
};
