const { createStore, applyMiddleware, compose } = require("redux");
const { default: thunk } = require("redux-thunk");
const { rootReducer } = require("../redux/reducers/rootReducer");

const actionSanitizer = (action) =>
  action.type === "FILE_DOWNLOAD_SUCCESS" && action.data
    ? { ...action, data: "<<LONG_BLOB>>" }
    : action;

const composeEnhancers =
  window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({
    actionSanitizer,
    stateSanitizer: (state) =>
      state.data ? { ...state, data: "<<LONG_BLOB>>" } : state,
  }) || compose;

export const store = createStore(
  rootReducer,
  composeEnhancers(applyMiddleware(thunk))
);
