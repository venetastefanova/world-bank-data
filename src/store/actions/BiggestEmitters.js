import * as actionTypes from "./actionTypes";
import axios from "axios";

export const getBiggestEmitters = (data) => {
    return{
        type: actionTypes.GET_BIGGEST_EMITTERS_IN_SPECIFIC_YEAR,
        data:data
    }
}


export const fetchDataFail = () => {
    return {
      type: actionTypes.FETCH_DATA_FAIL
    };
  };
  
export const getData = (year) => {
    return dispatch => {
      // coming from redux thunk
      axios.get(`https://api.worldbank.org/v2/country/all/indicator/EN.ATM.CO2E.KT?format=json&per_page=300&date=2005`)
        .then(response => {
         
            console.log(response.data[1]);
            const sortedResponse = response.data[1].sort((a,b)=>b.value-a.value)
            const sortedResponseFilter = sortedResponse.filter(country=>{
                return country.countryiso3code !== "" 
            })
            console.log(sortedResponse)
            console.log(sortedResponseFilter)
            // let years =[];
            // response.data[1].forEach(country=>{
            //    years.push(country.date)
            // })
            // dispatch(getBiggestEmitters(years));
        })
        .catch(error => {
          dispatch(fetchDataFail());
        });
    };
  };
  