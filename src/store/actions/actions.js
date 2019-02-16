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


export const getCountry = (country) => {
  return dispatch => {
    // coming from redux thunk
    axios.get(`https://api.worldbank.org/v2/country/${country}/indicator/SP.POP.TOTL?format=json&date=2010`)
      .then(response => {
        // dispatch(fetchDataSuccess(response.data[1]));
      })
      .catch(error => {
        dispatch(fetchDataFail());
      });
  };
};

// initial load
export const fetchAllCountries = (allCountries) =>{
    return {
        type: actionTypes.FETCH_ALL_COUNTRIES,
        allCountries:allCountries
      };
}
export const getAllCountries = ()=>{
    return dispatch => {
        // coming from redux thunk
        axios.get("https://api.worldbank.org/v2/country?format=json&per_page=10000")
          .then(response => {
               const allCountries =[];
              response.data[1].forEach(res=>{
                allCountries.push({
                    name:res.name,
                    id:res.id,
                    code:res.iso2Code
                })               
              })
            console.log( allCountries)
            dispatch(fetchAllCountries(allCountries));
          })
          .catch(error => {
            dispatch(fetchDataFail());
          });
      };
}