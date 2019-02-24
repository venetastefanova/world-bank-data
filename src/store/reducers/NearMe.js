import * as actionTypes from "../actions/actionTypes";

const initialState = {
  populationData: null,
  emissionsData: null,
  visible: false
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.GET_YEARS_INTERVAL_POPULATION_DATA_NEAR_ME:
      return {
        ...state,
        populationData: action.populationData,
        visible: true
      };
    case actionTypes.GET_YEARS_INTERVAL_EMISSIONS_DATA_NEAR_ME:
      return {
        ...state,
        emissionsData: action.emissionsData
      };
    default:
      return state;
  }
};

export default reducer;
