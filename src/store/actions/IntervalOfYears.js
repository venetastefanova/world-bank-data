import * as actionTypes from "./actionTypes";
import axios from "axios";

export const fetchPopulationData = (populationData) => {
    return{
      type: actionTypes.GET_YEARS_INTERVAL_POPULATION_DATA,
      populationData:populationData
    }
}

export const fetchEmissionsData= (emissionsData) => {
  return{
      type: actionTypes.GET_YEARS_INTERVAL_EMISSIONS_DATA,
      emissionsData:emissionsData
  }
}


export const fetchDataFail = () => {
    return {
      type: actionTypes.FETCH_DATA_FAIL
    };
  };
  

  export const getCountryDataForIntervalYears = (country,year1,year2) => {
    return dispatch => {
      // coming from redux thunk
      axios.get(`https://api.worldbank.org/v2/country/${country}/indicator/SP.POP.TOTL?format=json&date=${year1}:${year2}`)
        .then(response => {
            console.log("yes woho")
            console.log(country)
            console.log(year1,year2)
            console.log(response.data[1]);
            dispatch(fetchPopulationData(response.data[1]));
        })
        .catch(error => {
          dispatch(fetchDataFail());
        });
      axios.get(`https://api.worldbank.org/v2/country/${country}/indicator/EN.ATM.CO2E.KT?format=json&date=${year1}:${year2}`)
        .then(response => {
            console.log("yes woho2")
            console.log(country)
            console.log(year1,year2)
            console.log(response.data[1]);
            dispatch(fetchEmissionsData(response.data[1]));
        })
        .catch(error => {
          dispatch(fetchDataFail());
        });
    };
  };