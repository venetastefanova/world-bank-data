import * as actionTypes from "../actions/actionTypes";

const initialState = {
  emissionsData: null,
  visible: false
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.GET_WORLD_POWER_COUNTRIES_EMISSIONS:
      return {
        ...state,
        emissionsData: action.emissionsData,
        visible: true
      };
    case actionTypes.RESET_STATE:
      return {
        ...state,
        emissionsData: null,
        visible: false
      };
    default:
      return state;
  }
};

export default reducer;
