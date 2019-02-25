import * as actionTypes from "../actions/actionTypes";

const initialState = {
  populationData: null,
  emissionsData: null,
  region:"",
  visible: false
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.GET_YEARS_INTERVAL_POPULATION_DATA_NEAR_ME:
    let regionName =  action.populationData[0].region;
      return {
        ...state,
        populationData: action.populationData,
        visible: true,
        region:regionName
      };
    case actionTypes.GET_YEARS_INTERVAL_EMISSIONS_DATA_NEAR_ME:
      return {
        ...state,
        emissionsData: action.emissionsData
      };
    case actionTypes.RESET_STATE:
      return {
        ...state,
        populationData: null,
        emissionsData: null,
        visible: false
      };
    default:
      return state;
  }
};

export default reducer;
