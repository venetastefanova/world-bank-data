import * as actionTypes from "./actionTypes";
import * as globalActions from './globalActions';
import axios from "axios";

export const fetchEmissionsData = emissionsData => {
  return {
    type: actionTypes.GET_WORLD_POWER_COUNTRIES_EMISSIONS,
    emissionsData: emissionsData
  };
};

export const getCountries = year => {
  return dispatch => {
    // get all countries for the specific year
    axios.get(`https://api.worldbank.org/v2/country/all/indicator/EN.ATM.CO2E.KT?format=json&per_page=300&date=${year}`)
      .then(response => {
        let worldPowerfulCountriesData =[];
        //filter and get only countries 
        const allCountries = response.data[1].filter(countryData => {
          return countryData.countryiso3code;
        });
        //sum of all emissions data for the year
        const totalEmissionsValue = allCountries.reduce(function(prev, next) {
          return prev + next.value;
        }, 0);
        //get only Russia, USA and China's data
        allCountries.filter(countryData => {
          return (
            countryData.countryiso3code === "RUS" ||
            countryData.countryiso3code === "USA" ||
            countryData.countryiso3code === "CHN"
          );
        }).forEach(countryData=>{
          //calculate the emission percentage compared to global of each of the powerful countries 
          if(countryData.value===null){
            worldPowerfulCountriesData.push({
              y: 0,
              label:countryData.country.value
            })
          }
          else{
            worldPowerfulCountriesData.push({
              y: Math.round((countryData.value / totalEmissionsValue) *100),
              label:countryData.country.value
            })
          }
         
        })
        //get the rest of the world data and send it all to redux
        let restOfTheWorld = worldPowerfulCountriesData.reduce(function(prev, next) {
          return prev + next.y;
        }, 0);
        worldPowerfulCountriesData.push({
          y:100 -restOfTheWorld,
          label: "The rest of the world"
        })
        dispatch(fetchEmissionsData(worldPowerfulCountriesData));
      })
      .catch(error => {
        dispatch(globalActions.fetchDataFail(error));
      });
  };
};
