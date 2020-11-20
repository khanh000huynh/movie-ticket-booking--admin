import { createAction } from "./actionCreator";
import { SET_SEARCH_INFO } from "./actionTypes";

export const setSearchInfo = (info) => {
  return (dispatch) => {
    dispatch(createAction(SET_SEARCH_INFO, info));
  };
};
