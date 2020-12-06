const { createStore, applyMiddleware, compose } = require("redux");
const { default: thunk } = require("redux-thunk");
const { rootReducer } = require("../redux/reducers/rootReducer");

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export const store = createStore(
  rootReducer,
  composeEnhancers(applyMiddleware(thunk))
);
