import * as actionTypes from "./actionTypes";
import axios from "axios";

export const getBiggestEmissions = (emissions) => {
    return{
        type: actionTypes.GET_BIGGEST_EMISSIONS_IN_SPECIFIC_YEAR,
        emissions:emissions
    }
}

export const getBiggestPopulations = (populations) => {
  return{
      type: actionTypes.GET_BIGGEST_POPULATION_IN_SPECIFIC_YEAR,
      populations:populations
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
            // console.log(sortedResponse)
            // console.log(sortedResponseFilter)
            let result = [];
            let secondAPIdata =[];
            sortedResponseFilter.forEach(res=>{
                result.push({
                    label:res.country.value,
                    emissions:res.value
                })
                secondAPIdata.push(res.countryiso3code)

              })
             //console.log(result.slice(0,10))
             dispatch(getBiggestEmissions(result.slice(0,10)));
             return secondAPIdata;
        })
        .then(secondAPIdata =>{
          let passedData = [];
          secondAPIdata.slice(0,10).forEach(country=>{
            passedData.push(country);
          })
          axios.get(`https://api.worldbank.org/v2/country/all/indicator/SP.POP.TOTL?format=json&per_page=300&date=${year}`)
          .then(response => {    
            const allCountries =[];   
            const getPopulation=  response.data[1].filter(country=> passedData.includes(country.countryiso3code)); 
            // filters the API response with the given countries and returns the matches
            //  console.log(result)
            getPopulation.forEach(res=>{
                allCountries.push({
                  label:res.country.value,
                  populations:res.value
                })        
              })
              //console.log(allCountries)
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
  