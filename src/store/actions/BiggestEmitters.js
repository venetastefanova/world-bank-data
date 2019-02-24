import * as actionTypes from "./actionTypes";
import axios from "axios";

export const getBiggestEmissions = emissions => {
  return {
    type: actionTypes.GET_BIGGEST_EMISSIONS_IN_SPECIFIC_YEAR,
    emissions: emissions
  };
};

export const getBiggestPopulations = populations => {
  return {
    type: actionTypes.GET_BIGGEST_POPULATION_IN_SPECIFIC_YEAR,
    populations: populations
  };
};
export const fetchDataFail = () => {
  return {
    type: actionTypes.FETCH_DATA_FAIL
  };
};

export const getData = year => {
  return dispatch => {
    //get top 10 bigget emitters countries
    axios.get(`https://api.worldbank.org/v2/country/all/indicator/EN.ATM.CO2E.KT?format=json&per_page=300&date=${year}`)
      .then(response => {
        const getBiggestEmitters = response.data[1].sort(
          (a, b) => b.value - a.value
        );
        const getBiggestEmittersFilter = getBiggestEmitters.filter(country => {
          return country.countryiso3code !== "";
        });
        let result = [];
        let countriesCode = [];
        getBiggestEmittersFilter.forEach(res => {
          result.push({
            label: res.country.value,
            emissions: res.value
          });
          countriesCode.push(res.countryiso3code);
        });
        dispatch(getBiggestEmissions(result.slice(0, 10)));
        return countriesCode;
      })
      .then(countriesCode => {
        let passedData = [];
        countriesCode.slice(0, 10).forEach(country => {
          passedData.push(country);
        });
        //get the biggest emitters countries population
        axios.get(`https://api.worldbank.org/v2/country/all/indicator/SP.POP.TOTL?format=json&per_page=300&date=${year}`)
          .then(response => {
            const allCountries = [];
            const getPopulation = response.data[1].filter(country =>
              passedData.includes(country.countryiso3code)
            );
            // filters the API response with the given countries and returns the matches
            getPopulation.forEach(res => {
              allCountries.push({
                label: res.country.value,
                populations: res.value
              });
            });
            dispatch(getBiggestPopulations(allCountries));
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
