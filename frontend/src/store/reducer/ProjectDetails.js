import *as actionTypes from '../action/actionTypes';

const initialState={
    project:null,
    loading:false,
    error:null,
}

const reducer=(state=initialState,actions)=>{
    switch (actions.type) {
        case actionTypes.FETCH_DETAILS_START:
            return{
                ...state,
                loading:true,
            }
        case actionTypes.FETCH_DETAILS_FAIL:{
            return{
                ...state,
                error:actions.error,
                loading:false
            }
        }
        case actionTypes.FETCH_DETAILS_SUCCESS:
            return{
                ...state,
                project:actions.project,
                error:null,
                loading:false,
            }
        default:
           return state;
    }
}

export default reducer