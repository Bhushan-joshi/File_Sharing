import * as actionTypes from '../../store/action/actionTypes';

const initalState = {
    projects:[],
    loading:false,
    error:null
}

const reducer = (state = initalState, action) => {
    switch (action.type) {
        case actionTypes.FETCH_PROJECTS_START:
            return {
                ...state,
                loading: true,
            }
        case actionTypes.FETCH_PROJECTS_FAIL:
            return {
                ...state,
                error: action.error,
                loading: false
            }
        case actionTypes.FETCH_PROJECTS_SUCCESS:
            return {
                ...state,
                projects:action.projects,
                error: null,
                loading: false
            }
        default:
            return state
    }
}

export default reducer