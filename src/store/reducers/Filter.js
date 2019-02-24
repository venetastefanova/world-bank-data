import * as actionTypes from "../actions/actionTypes";

const initialState = {
  allCountries: [],
  currentPopulationData: null,
  currentEmissionsData: null,
  years: [],
  biggestEmitters: []
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.FETCH_ALL_COUNTRIES:
      return {
        ...state,
        allCountries: action.allCountries
      };
    case actionTypes.FETCH_CURRENT_POPULATION_DATA:
      return {
        ...state,
        currentPopulationData: action.currentPopulationData
      };
    case actionTypes.FETCH_CURRENT_EMISSIONS_DATA:
      return {
        ...state,
        currentEmissionsData: action.currentEmissionsData
      };
    case actionTypes.FETCH_ALL_YEARS:
      return {
        ...state,
        years: action.years
      };
    default:
      return state;
  }
};

export default reducer;
