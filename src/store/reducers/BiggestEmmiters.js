import * as actionTypes from "../actions/actionTypes";

const initialState = {
  visible: false,
  emissions: [],
  populations: []
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.GET_BIGGEST_EMISSIONS_IN_SPECIFIC_YEAR:
      return {
        ...state,
        emissions: action.emissions
      };
    case actionTypes.GET_BIGGEST_POPULATION_IN_SPECIFIC_YEAR:
      return {
        ...state,
        populations: action.populations,
        visible: true
      };
    case actionTypes.RESET_STATE:
      return {
        ...state,
        visible: false,
        emissions: [],
        populations: []
      };
    default:
      return state;
  }
};

export default reducer;
