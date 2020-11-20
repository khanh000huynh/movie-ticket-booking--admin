import { SET_SEARCHED_ACCOUNT, SET_USER_LIST } from "../actions/actionTypes";

let initialState = {
  userList: [],
  searchedAccount: {},
};

export const userReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case SET_USER_LIST: {
      return { ...state, userList: payload };
    }
    case SET_SEARCHED_ACCOUNT: {
      return { ...state, searchedAccount: payload };
    }
    default:
      return state;
  }
};
