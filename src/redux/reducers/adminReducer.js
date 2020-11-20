import { SET_CREDENTIAL } from "../actions/actionTypes";

let initialState = {
  credential: {},
};

export const adminReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case SET_CREDENTIAL: {
      return { ...state, credential: payload };
    }
    default:
      return state;
  }
};
