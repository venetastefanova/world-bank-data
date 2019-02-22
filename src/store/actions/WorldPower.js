import * as actionTypes from "./actionTypes";
import axios from "axios";

// export const fetchPopulationData = populationData => {
//   return {
//     type: actionTypes.GET_YEARS_INTERVAL_POPULATION_DATA,
//     populationData: populationData
//   };
// };

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
// https://api.worldbank.org/v2/country/all/indicator/EN.ATM.CO2E.KT?format=json&per_page=300&date=2010
// https://api.worldbank.org/v2/country/chn;usa;rus/indicator/EN.ATM.CO2E.KT?format=json&per_page=300&date=${year}
export const getMyCountry = year => {
  return dispatch => {
    // get countries
    axios
      .get(
        `https://api.worldbank.org/v2/country/all/indicator/EN.ATM.CO2E.KT?format=json&per_page=300&date=${year}`
      )
      .then(response => {
        let worldPowerfulCountriesData =[];
        const allCountries = response.data[1].filter(countryData => {
          return countryData.countryiso3code;
        });
        const totalEmissionsValue = allCountries.reduce(function(prev, next) {
          return prev + next.value;
        }, 0);
        allCountries.filter(countryData => {
          return (
            countryData.countryiso3code === "RUS" ||
            countryData.countryiso3code === "USA" ||
            countryData.countryiso3code === "CHN"
          );
        }).forEach(countryData=>{
          worldPowerfulCountriesData.push({
           y: Math.round((countryData.value / totalEmissionsValue) *100),
            label:countryData.country.value
          })
        })

        let restOfTheWorld = worldPowerfulCountriesData.reduce(function(prev, next) {
          return prev + next.y;
        }, 0);
        worldPowerfulCountriesData.push({
          y:100 -restOfTheWorld,
          label: "The rest of the world"
        })
        console.log(restOfTheWorld)
        dispatch(fetchEmissionsData(worldPowerfulCountriesData));
      })
      .catch(error => {
        dispatch(fetchDataFail());
      });
    //get emissions
  };
};
