import * as actionTypes from '../actions/actionTypes';

const initialState = {
    visible:false,
    emissions:[],
    populations: []
}

const reducer = (state = initialState, action)=>{
    switch(action.type){
      case actionTypes.GET_BIGGEST_EMISSIONS_IN_SPECIFIC_YEAR:
     // console.log(action.emissions)
        return{
          ...state,
          emissions:action.emissions
        }
      case actionTypes.GET_BIGGEST_POPULATION_IN_SPECIFIC_YEAR:
      //console.log(action.populations)
      return{
        ...state,
        populations:action.populations,
        visible:true
      }
      default:
        return state;
    }
}


export default reducer;