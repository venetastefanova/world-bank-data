import * as actionTypes from '../actions/actionTypes';

const initialState = {

}

const reducer = (state = initialState, action)=>{
    switch(action.type){
    //   case actionTypes.FETCH_ALL_COUNTRIES:
    //   console.log(action.allCountries)
    //     return{
    //       ...state,
    //       allCountries:action.allCountries
    //     }
    //   case actionTypes.FETCH_CURRENT_POPULATION_DATA:
    //     //  console.log(action.currentData)
    //       return{
    //         ...state,
    //         currentPopulationData:action.currentPopulationData
    //       }
    //   case actionTypes.FETCH_CURRENT_EMISSIONS_DATA:
    //   //  console.log(action.currentData)
    //     return{
    //       ...state,
    //       currentEmissionsData:action.currentEmissionsData
    //     }
    //   case actionTypes.FETCH_ALL_YEARS:
    //   console.log(action.years)
    //       return{
    //         ...state,
    //         years: action.years
    //       }
      default:
        return state;
    }
}

export default reducer;