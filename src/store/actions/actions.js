import * as actionTypes from "./actionTypes";
import axios from "axios";

export const fetchDataSuccess = currentData => {
  return {
    type: actionTypes.FETCH_CURRENT_DATA,
    currentData: currentData
  };
};

export const fetchDataFail = () => {
  return {
    type: actionTypes.FETCH_DATA_FAIL
  };
};

export const initData = () => {
  return dispatch => {
    // coming from redux thunk
    axios.get("https://api.worldbank.org/v2/country/BG/indicator/SP.POP.TOTL?format=json&date=2010")
      .then(response => {
        dispatch(fetchDataSuccess(response.data[1]));
      })
      .catch(error => {
        dispatch(fetchDataFail());
      });
  };
};
