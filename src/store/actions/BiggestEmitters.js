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
      axios.get(`https://api.worldbank.org/v2/country/all/indicator/EN.ATM.CO2E.KT?format=json&per_page=300&date=${year}`)
        .then(response => {       
            console.log(response.data[1]);
            const sortedResponse = response.data[1].sort((a,b)=>b.value-a.value)
            const sortedResponseFilter = sortedResponse.filter(country=>{
                return country.countryiso3code !== "" 
            })
            console.log(sortedResponse)
            console.log(sortedResponseFilter)
            let result = [];
            sortedResponseFilter.forEach(res=>{
                result.push({
                    label:res.country.value,
                    y:res.value
                })               
              })
              console.log(result.slice(0,10))
             dispatch(getBiggestEmitters(result.slice(0,10)));
        })
        .catch(error => {
          dispatch(fetchDataFail());
        });
    };
  };
  