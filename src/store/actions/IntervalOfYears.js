import * as actionTypes from "./actionTypes";
import axios from "axios";

export const fetchPopulationData = populationData => {
  return {
    type: actionTypes.GET_YEARS_INTERVAL_POPULATION_DATA,
    populationData: populationData
  };
};

export const fetchEmissionsData = emissionsData => {
  return {
    type: actionTypes.GET_YEARS_INTERVAL_EMISSIONS_DATA,
    emissionsData: emissionsData
  };
};

export const fetchDataFail = () => {
  return {
    type: actionTypes.FETCH_DATA_FAIL
  };
};

export const getCountryDataForIntervalYears = (country, year1, year2) => {
  return dispatch => {
    // get population data for period of time
    axios.get(`https://api.worldbank.org/v2/country/${country}/indicator/SP.POP.TOTL?format=json&date=${year1}:${year2}`)
      .then(response => {
        let populationForTheIntervalYears = [];
        response.data[1].forEach(res => {
          if(res.value===null){
            populationForTheIntervalYears.push({
              y: 0,
              label: res.date
            });
          }
          else{
            populationForTheIntervalYears.push({
              y: res.value,
              label: res.date
            });
          }
        });
        dispatch(fetchPopulationData(populationForTheIntervalYears.reverse()));
      })
      .catch(error => {
        dispatch(fetchDataFail());
      });
    //get emissions data for period of time
    axios.get(`https://api.worldbank.org/v2/country/${country}/indicator/EN.ATM.CO2E.KT?format=json&date=${year1}:${year2}`)
      .then(response => {
        let emissionsForTheIntervalYears = [];
        response.data[1].forEach(res => {
          emissionsForTheIntervalYears.push({
            y: res.value,
            label: res.date
          });
        });
        dispatch(fetchEmissionsData(emissionsForTheIntervalYears.reverse()));
      })
      .catch(error => {
        dispatch(fetchDataFail());
      });
  };
};
