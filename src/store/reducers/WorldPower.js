import * as actionTypes from '../actions/actionTypes';

const initialState = {
  emissionsData:null,
  visible:false
}

const reducer = (state = initialState, action)=>{
    switch(action.type){
      case actionTypes.GET_YEARS_INTERVAL_EMISSIONS_DATA:
         console.log(action.emissionsData)
          return{
            ...state,
            emissionsData:action.emissionsData,
            visible:true
          }
      default:
        return state;
    }   
}

export default reducer;