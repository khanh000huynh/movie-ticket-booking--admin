import { combineReducers } from "redux";
import { adminReducer } from "./adminReducer";
import { movieReducer } from "./movieReducer";
import { searchReducer } from "./searchReducer";
import { showtimeReducer } from "./showtimeReducer";
import { theaterReducer } from "./theaterReducer";
import { userReducer } from "./userReducer";

export const rootReducer = combineReducers({
  movie: movieReducer,
  search: searchReducer,
  admin: adminReducer,
  user: userReducer,
  theater: theaterReducer,
  showtime: showtimeReducer,
});
