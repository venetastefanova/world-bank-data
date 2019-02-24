import * as actionTypes from "../actions/actionTypes";

const initialState = {
  populationData: null,
  emissionsData: null,
  visible: false
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.GET_YEARS_INTERVAL_POPULATION_DATA:
      return {
        ...state,
        populationData: action.populationData
      };
    case actionTypes.GET_YEARS_INTERVAL_EMISSIONS_DATA:
      return {
        ...state,
        emissionsData: action.emissionsData,
        visible: true
      };
    default:
      return state;
  }
};

export default reducer;
