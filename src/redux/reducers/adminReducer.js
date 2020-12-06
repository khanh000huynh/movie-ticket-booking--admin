import { SET_CREDENTIAL, SET_IS_LOGGING_IN } from "../actions/actionTypes";

let initialState = {
  credential: {},
  isLoggingIn: false,
};

export const adminReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case SET_CREDENTIAL: {
      return { ...state, credential: payload };
    }
    case SET_IS_LOGGING_IN: {
      return { ...state, isLoggingIn: payload };
    }
    default:
      return state;
  }
};
