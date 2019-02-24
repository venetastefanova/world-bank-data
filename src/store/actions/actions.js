import * as actionTypes from "./actionTypes";
import axios from "axios";

export const fetchCurrentPopulationData = currentPopulationData => {
  return {
    type: actionTypes.FETCH_CURRENT_POPULATION_DATA,
    currentPopulationData: currentPopulationData
  };
};

export const fetchCurrentEmissionsData = currentEmissionsData => {
  return {
    type: actionTypes.FETCH_CURRENT_EMISSIONS_DATA,
    currentEmissionsData:currentEmissionsData
  };
};

export const fetchDataFail = () => {
  return {
    type: actionTypes.FETCH_DATA_FAIL
  };
};


export const getCountry = (country,year) => {
  return dispatch => {
    // get population per country in specific year
    axios.get(`https://api.worldbank.org/v2/country/${country}/indicator/SP.POP.TOTL?format=json&date=${year}`)
      .then(response => {
         dispatch(fetchCurrentPopulationData(response.data[1]));
      })
      .catch(error => {
        dispatch(fetchDataFail());
      });
       // get emissions per country in specific year
    axios.get(`https://api.worldbank.org/v2/country/${country}/indicator/EN.ATM.CO2E.KT?format=json&date=${year}`)
      .then(response => {
          dispatch(fetchCurrentEmissionsData(response.data[1]));
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
        // get all countries and filter them with the given data from Reaktor
        axios.get("https://api.worldbank.org/v2/country?format=json&per_page=10000")
          .then(response => {
            const allCountries =[];
            const givenCountriesFromReaktor=["Aruba","Afghanistan","Angola","Albania","Andorra","Arab World","United Arab Emirates","Argentina","Armenia","American Samoa","Antigua and Barbuda","Australia","Austria","Azerbaijan","Burundi","Belgium","Benin","Burkina Faso","Bangladesh","Bulgaria","Bahrain","Bahamas, The","Bosnia and Herzegovina","Belarus","Belize","Bermuda","Bolivia","Brazil","Barbados","Brunei Darussalam","Bhutan","Botswana","Central African Republic","Canada","Central Europe and the Baltics","Switzerland","Channel Islands","Chile","China","Cote d'Ivoire","Cameroon","Congo, Dem. Rep.","Congo, Rep.","Colombia","Comoros","Cabo Verde","Costa Rica","Caribbean small states","Cuba","Curacao","Cayman Islands","Cyprus","Czech Republic","Germany","Djibouti","Dominica","Denmark","Dominican Republic","Algeria","East Asia & Pacific (excluding high income)","Early-demographic dividend","East Asia & Pacific","Europe & Central Asia (excluding high income)","Europe & Central Asia","Ecuador","Egypt, Arab Rep.","Euro area","Eritrea","Spain","Estonia","Ethiopia","European Union","Fragile and conflict affected situations","Finland","Fiji","France","Faroe Islands","Micronesia, Fed. Sts.","Gabon","United Kingdom","Georgia","Ghana","Gibraltar","Guinea","Gambia, The","Guinea-Bissau","Equatorial Guinea","Greece","Grenada","Greenland","Guatemala","Guam","Guyana","High income","Hong Kong SAR, China","Honduras","Heavily indebted poor countries (HIPC)","Croatia","Haiti","Hungary","IBRD only","IDA & IBRD total","IDA total","IDA blend","Indonesia","IDA only","Isle of Man","India","Ireland","Iran, Islamic Rep.","Iraq","Iceland","Israel","Italy","Jamaica","Jordan","Japan","Kazakhstan","Kenya","Kyrgyz Republic","Cambodia","Kiribati","St. Kitts and Nevis","Korea, Rep.","Kuwait","Latin America & Caribbean (excluding high income)","Lao PDR","Lebanon","Liberia","Libya","St. Lucia","Latin America & Caribbean","Least developed countries: UN classification","Low income","Liechtenstein","Sri Lanka","Lower middle income","Low & middle income","Lesotho","Late-demographic dividend","Lithuania","Luxembourg","Latvia","Macao SAR, China","St. Martin (French part)","Morocco","Monaco","Moldova","Madagascar","Maldives","Middle East & North Africa","Mexico","Marshall Islands","Middle income","Macedonia, FYR","Mali","Malta","Myanmar","Middle East & North Africa (excluding high income)","Montenegro","Mongolia","Northern Mariana Islands","Mozambique","Mauritania","Mauritius","Malawi","Malaysia","North America","Namibia","New Caledonia","Niger","Nigeria","Nicaragua","Netherlands","Norway","Nepal","Nauru","New Zealand","OECD members","Oman","Other small states","Pakistan","Panama","Peru","Philippines","Palau","Papua New Guinea","Poland","Pre-demographic dividend","Puerto Rico","Korea, Dem. People’s Rep.","Portugal","Paraguay","West Bank and Gaza","Pacific island small states","Post-demographic dividend","French Polynesia","Qatar","Romania","Russian Federation","Rwanda","South Asia","Saudi Arabia","Sudan","Senegal","Singapore","Solomon Islands","Sierra Leone","El Salvador","San Marino","Somalia","Serbia","Sub-Saharan Africa (excluding high income)","South Sudan","Sub-Saharan Africa","Small states","Sao Tome and Principe","Suriname","Slovak Republic","Slovenia","Sweden","Eswatini","Sint Maarten (Dutch part)","Seychelles","Syrian Arab Republic","Turks and Caicos Islands","Chad","East Asia & Pacific (IDA & IBRD countries)","Europe & Central Asia (IDA & IBRD countries)","Togo","Thailand","Tajikistan","Turkmenistan","Latin America & the Caribbean (IDA & IBRD countries)","Timor-Leste","Middle East & North Africa (IDA & IBRD countries)","Tonga","South Asia (IDA & IBRD)","Sub-Saharan Africa (IDA & IBRD countries)","Trinidad and Tobago","Tunisia","Turkey","Tuvalu","Tanzania","Uganda","Ukraine","Upper middle income","Uruguay","United States","Uzbekistan","St. Vincent and the Grenadines","Venezuela, RB","British Virgin Islands","Virgin Islands (U.S.)","Vietnam","Vanuatu","World","Samoa","Kosovo","Yemen, Rep.","South Africa","Zambia","Zimbabwe"]
             const result=  response.data[1].filter(country=> givenCountriesFromReaktor.includes(country.name)); // filters the API response with the given countries and returns the matches
             result.forEach(res=>{
                allCountries.push({
                    name:res.name,
                    id:res.id,
                    code:res.iso2Code
                })               
              })
            dispatch(fetchAllCountries(allCountries));
          })
          .catch(error => {
            dispatch(fetchDataFail());
          });
      };
}


export const fetchAllYears = (years) => {
  return {
    type: actionTypes.FETCH_ALL_YEARS,
    years:years
  };
}
export const getAllYears = () => {
  return dispatch => {
    // coming from redux thunk
    axios.get(`https://api.worldbank.org/v2/country/FIN/indicator/SP.POP.TOTL?format=json&per_page=100`)
      .then(response => {
          let years =[];
          response.data[1].forEach(country=>{
             years.push(country.date)
          })
          dispatch(fetchAllYears(years));
      })
      .catch(error => {
        dispatch(fetchDataFail());
      });
  };
};
