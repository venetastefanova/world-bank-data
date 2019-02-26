import * as actionTypes from "./actionTypes";
import * as globalActions from './globalActions';
import axios from "axios";

export const fetchCurrentPopulationData = currentPopulationData => {
  return {
    type: actionTypes.FETCH_CURRENT_POPULATION_DATA,
    currentPopulationData: currentPopulationData
  };
};

export const fetchCurrentEmissionsData = currentEmissionsData => {
  return {
    type: actionTypes.FETCH_CURRENT_EMISSIONS_DATA,
    currentEmissionsData: currentEmissionsData
  };
};

export const getCountry = (country, year) => {
  return dispatch => {
    // get population per country in specific year
    axios
      .get(
        `https://api.worldbank.org/v2/country/${country}/indicator/SP.POP.TOTL?format=json&date=${year}`
      )
      .then(response => {
        dispatch(fetchCurrentPopulationData(response.data[1]));
      })
      .catch(error => {
        dispatch(globalActions.fetchDataFail(error));
      });
    // get emissions per country in specific year
    axios
      .get(
        `https://api.worldbank.org/v2/country/${country}/indicator/EN.ATM.CO2E.KT?format=json&date=${year}`
      )
      .then(response => {
        dispatch(fetchCurrentEmissionsData(response.data[1]));
      })
      .catch(error => {
        dispatch(globalActions.fetchDataFail(error));
      });
  };
};
