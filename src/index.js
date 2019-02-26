import React from "react";
import * as serviceWorker from "./serviceWorker";
import ReactDOM from "react-dom";
import { createStore, applyMiddleware, compose, combineReducers } from "redux";
import { Provider } from "react-redux";
import thunk from "redux-thunk";
import { BrowserRouter } from "react-router-dom";
//import reducers and styles
import "./index.css";
import IndividualCountry from "./store/reducers/IndividualCountry";
import BiggestEmitters from './store/reducers/BiggestEmmiters';
import IntervalOfYears from './store/reducers/IntervalOfYears';
import NearMe from './store/reducers/NearMe';
import WorldPower from './store/reducers/WorldPower';


import App from "./App";
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const rootReducer = combineReducers({
  IndividualCountry:IndividualCountry,
  BiggestEmitters:BiggestEmitters,
  IntervalOfYears: IntervalOfYears,
  NearMe:NearMe,
  WorldPower:WorldPower
})
//create store
const store = createStore(rootReducer, composeEnhancers(applyMiddleware(thunk)));

ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
