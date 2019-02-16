import * as actionTypes from './actions/actionTypes';

const initialState = {
  allCountries:[],
  currentData: []
}

const reducer = (state = initialState, action)=>{
    switch(action.type){
      case actionTypes.FETCH_ALL_COUNTRIES:
        return{
          ...state,
          allCountries:action.allCountries
        }
      case actionTypes.FETCH_CURRENT_DATA:
      console.log(action.currentData)
          return{
            ...state,
            currentData:action.currentData
          }

      default:
        return state;
    }
}

export default reducer;