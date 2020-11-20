import { SET_SEARCH_INFO } from "../actions/actionTypes";

let initialState = {
  searchInfo: "",
};

export const searchReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case SET_SEARCH_INFO: {
      return { ...state, searchInfo: payload };
    }
    default:
      return state;
  }
};
