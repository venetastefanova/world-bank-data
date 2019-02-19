import * as actionTypes from '../actions/actionTypes';

const initialState = {
    visible:false,
    data:[]
}

const reducer = (state = initialState, action)=>{
    switch(action.type){
      case actionTypes.GET_BIGGEST_EMITTERS_IN_SPECIFIC_YEAR:
      console.log(action.data)
        return{
          ...state,
          data:action.data,
          visible:true
        }
      default:
        return state;
    }
}


export default reducer;