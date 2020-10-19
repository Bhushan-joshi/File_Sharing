import Axios from 'axios';
import * as actionTypes from './actionTypes';

const newProjectStart = () => {
    return {
        type: actionTypes.NEW_PROJECT_START
    }
}

const newProjectFail = error => {
    return {
        type: actionTypes.NEW_PROJECT_FAIL,
        error: error.message,
    }
}

const newProjectSuccess = (data) => {
    return {
        type: actionTypes.NEW_PROJECT_SUCCESS,
        data: data
    }
}

export const newProject = (data, token) => {
    return dispatch => {
        dispatch(newProjectStart());
        const URL = 'http://127.0.0.1:8000/projects/newPost';
        Axios.post(URL, data, {
            headers: {
                'Authorization': 'Bearer ' + token,
                'Content-Type': 'multipart/form-data'
            }
        }).then(response => {
            dispatch(newProjectSuccess(response));
            dispatch(clearState())
        }).catch(err => {
            console.log(err);
            dispatch(newProjectFail(err));
            dispatch(clearState())  
        })

    }
}

const clearState = () => {
    return {
        type: actionTypes.NEW_PROJECT_CLEAR
    }
}