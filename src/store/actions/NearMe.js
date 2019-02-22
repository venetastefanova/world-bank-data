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
            // console.log(regionData)
            // let populationForTheIntervalYears = [];
            // response.data[1].forEach(res => {
            //   populationForTheIntervalYears.push({
            //     y: res.value,
            //     label: res.date
            //   });
            // });
            // dispatch(fetchPopulationData(populationForTheIntervalYears.reverse()));
          
            return {
              regionData,
              year1,
              year2
            }

          }) 
           // get the population in the regions
          .then(regionData=>{
            // // console.log(year1);
            // //     console.log(year2)
            //    console.log(regionData.regionData)
            //    console.log(year1)
            //    console.log(year2)

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
// export const getCountryDataForIntervalYears = (country, year1, year2) => {
//   return dispatch => {
//     // get population
//     axios
//       .get(
//         `https://api.worldbank.org/v2/country/${country}/indicator/SP.POP.TOTL?format=json&date=${year1}:${year2}`
//       )
//       .then(response => {
//         // console.log("yes woho")
//         // console.log(country)
//         // console.log(year1,year2)
//         // console.log(response.data[1]);
//         let populationForTheIntervalYears = [];
//         response.data[1].forEach(res => {
//           populationForTheIntervalYears.push({
//             y: res.value,
//             label: res.date
//           });
//         });
//         dispatch(fetchPopulationData(populationForTheIntervalYears.reverse()));
//       })
//       .catch(error => {
//         dispatch(fetchDataFail());
//       });
//     //get emissions
//     axios
//       .get(
//         `https://api.worldbank.org/v2/country/${country}/indicator/EN.ATM.CO2E.KT?format=json&date=${year1}:${year2}`
//       )
//       .then(response => {
//         let emissionsForTheIntervalYears = [];
//         response.data[1].forEach(res => {
//           emissionsForTheIntervalYears.push({
//             y: res.value,
//             label: res.date
//           });
//         });
//         dispatch(fetchEmissionsData(emissionsForTheIntervalYears.reverse()));
//       })
//       .catch(error => {
//         dispatch(fetchDataFail());
//       });
//   };
// };
