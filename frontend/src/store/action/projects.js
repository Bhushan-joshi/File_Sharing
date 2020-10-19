import Axios from 'axios';
import * as actionTypes from './actionTypes';


const fetchStart=()=>{
    return {
        type:actionTypes.FETCH_PROJECTS_START
    }
}
const fetchFail = (error)=>{
    return{
        type:actionTypes.FETCH_PROJECTS_FAIL,
        error:error
    }
}
const fetchSuccess=(resData)=>{
    return {
        type:actionTypes.FETCH_PROJECTS_SUCCESS,
        projects:resData
    }
}

export const fetchProjects=()=>{
    return dispatch=>{
        dispatch(fetchStart());
        const token=localStorage.getItem('token')
        Axios.get('http://127.0.0.1:8000/projects/',{
            headers:{'Authorization':'Bearer '+ token}
        }).then(response=>{
            dispatch(fetchSuccess(response.data.projects))
        }).catch(err=>{
            console.log(err.response);
            dispatch(fetchFail(err.response))
        })
    }
}