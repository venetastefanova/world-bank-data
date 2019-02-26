import * as actionTypes from "./actionTypes";
import axios from "axios";

export const fetchPopulationData = populationData => {
  return {
    type: actionTypes.GET_YEARS_INTERVAL_POPULATION_DATA_NEAR_ME,
    populationData: populationData
  };
};

export const fetchEmissionsData = emissionsData => {
  return {
    type: actionTypes.GET_YEARS_INTERVAL_EMISSIONS_DATA_NEAR_ME,
    emissionsData: emissionsData
  };
};

export const fetchDataFail = () => {
  return {
    type: actionTypes.FETCH_DATA_FAIL
  };
};
export const getCountryInput = (country, year1, year2) => {
  return dispatch => {
    //get country for the interval of years
    axios
      .get(
        `https://api.worldbank.org/v2/country/${country}?format=json&date=${year1}:${year2}`
      )
      .then(response => {
        let regionData = "";
        //get country region
        response.data[1].forEach(data => {
          return (regionData = data.region.id);
        });
        return {
          regionData,
          year1,
          year2
        };
      })
      .then(regionData => {
        //get the emissions data for the region in the interval of years
        axios
          .get(
            `https://api.worldbank.org/v2/country/${
              regionData.regionData
            }/indicator/SP.POP.TOTL?format=json&per_page=1000&date=${year1}:${year2}`
          )
          .then(response => {
            const allCountries = [];
            response.data[1].forEach(res => {
              if (res.value === null) {
                allCountries.push({
                  region: res.country.value,
                  y: 0,
                  label: res.date
                });
              } else {
                allCountries.push({
                  region: res.country.value,
                  y: res.value,
                  label: res.date
                });
              }
            });
            dispatch(fetchPopulationData(allCountries));
          })
          .catch(error => {
            dispatch(fetchDataFail());
          });
        //get the population data for the region in the interval of years
        axios
          .get(
            `https://api.worldbank.org/v2/country/${
              regionData.regionData
            }/indicator/EN.ATM.CO2E.KT?format=json&per_page=1000&date=${year1}:${year2}`
          )
          .then(response => {
            const allCountries = [];
            response.data[1].forEach(res => {
              if (res.value === null) {
              allCountries.push({
                region: res.country.value,
                y: 0,
                label: res.date
              });
            }
            else{
              allCountries.push({
                region: res.country.value,
                y: res.value,
                label: res.date
              });
            }
          });
            dispatch(fetchEmissionsData(allCountries.reverse()));
          })
          .catch(error => {
            dispatch(fetchDataFail());
          });
      })
      .catch(error => {
        dispatch(fetchDataFail());
      });
  };
};
