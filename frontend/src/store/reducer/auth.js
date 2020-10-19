import * as actionTypes from '../action/actionTypes'

const initalState = {
    tokenId: null,
    userId: null,
    loading: false,
    error: null
}

const reducer = (state = initalState, action) => {
    switch (action.type) {
        case actionTypes.AUTH_START:
            return {
                ...state,
                loading: true,
            }
        case actionTypes.AUTH_FAIL:
            return {
                ...state,
                error: action.error,
                loading: false
            }
        case actionTypes.AUTH_SUCCESS:
            return {
                ...state,
                tokenId: action.tokenId,
                userId: action.userId,
                error: null,
                loading: false
            }
        case actionTypes.AUTH_LOGOUT:
            return {
                tokenId: null,
                userId: null,
                loading: false,
                error: null
            }
        default:
            return state
    }
}

export default reducer