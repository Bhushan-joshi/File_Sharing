import Axios from 'axios';
import * as actionTypes from './actionTypes';

const fetchDetailsStart = () => {
    return {
        type: actionTypes.FETCH_DETAILS_START,
    }
}

const fetchDetailsFail = (error) => {
    return {
        type: actionTypes.FETCH_DETAILS_FAIL,
        error: error
    }
}

const fetchDetailsSuccess = (project) => {
    return {
        type: actionTypes.FETCH_DETAILS_SUCCESS,
        project: project
    }
}

export const fetchDetails = (projectId, token) => {
    return dispatch => {
        dispatch(fetchDetailsStart());
        Axios.get(`http://127.0.0.1:8000/projects/${projectId}`, {
            headers: { 'Authorization': 'Bearer ' + token }
        }).then(response => {
            dispatch(fetchDetailsSuccess(response.data._doc))
        }).catch(error => {
            console.log(error);
            dispatch(fetchDetailsFail(error.statusText))
        })
    }
}
