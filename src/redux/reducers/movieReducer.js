import {
  CHOOSE_MOVIE,
  SET_MOVIE_LIST,
  SET_SHOWING,
} from "../actions/actionTypes";

let initialState = {
  movieList: [],
  chosenMovie: {},
  showing: {},
};

export const movieReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case SET_MOVIE_LIST: {
      return { ...state, movieList: payload };
    }
    case CHOOSE_MOVIE: {
      return { ...state, chosenMovie: payload };
    }
    case SET_SHOWING: {
      return { ...state, showing: payload };
    }
    default:
      return state;
  }
};
