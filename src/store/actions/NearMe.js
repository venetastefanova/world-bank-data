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
export const getMyCountry = (country, year1, year2) =>{
    return dispatch => {
        // get the country code
        // console.log(year1, year2)
        axios
          .get(
            `https://api.worldbank.org/v2/country/${country}?format=json&date=${year1}:${year2}`
          )
          .then(response => {
            let regionData = ""
            response.data[1].forEach(data=>{
             return regionData = data.region.id;
                 
            });
            return {
              regionData,
              year1,
              year2
            }

          }) 
          .then(regionData=>{
              axios.get(
                `https://api.worldbank.org/v2/country/${regionData.regionData}/indicator/SP.POP.TOTL?format=json&per_page=1000&date=${year1}:${year2}`
              )
              .then(response => {
                
                  console.log(response)
                  const allCountries =[];
                  response.data[1].forEach(res=>{
                    allCountries.push({
                        region:res.country.value,
                        y: res.value,
                        label:res.date
                      })               
                    })
                    // console.log(allCountries)
                  dispatch(fetchPopulationData(allCountries));
              })
              .catch(error => {
                dispatch(fetchDataFail());
              });

              axios.get(
                `https://api.worldbank.org/v2/country/${regionData.regionData}/indicator/EN.ATM.CO2E.KT?format=json&per_page=1000&date=${year1}:${year2}`
              )
              .then(response => {
                
                  console.log(response)
                  const allCountries =[];
                  response.data[1].forEach(res=>{
                    allCountries.push({
                        region:res.country.value,
                        y: res.value,
                        label:res.date
                      })               
                    })
                    // console.log(allCountries)
                  dispatch(fetchEmissionsData(allCountries.reverse()));
              })
              .catch(error => {
                dispatch(fetchDataFail());
              });
          })
          .then()
          .catch(error => {
            dispatch(fetchDataFail());
          });
        //get emissions
        }
}
