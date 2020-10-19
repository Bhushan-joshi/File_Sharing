import * as actionTypes from './actionTypes';
import Axios from 'axios';

const authStart = () => {
    return {
        type: actionTypes.AUTH_START
    }
}

const authFail = (error) => {
    return {
        type: actionTypes.AUTH_FAIL,
        error: error.response.data.message
    }
}
export const authLogout = () => {
    localStorage.removeItem('token')
    localStorage.removeItem('userid')
    localStorage.removeItem('expiresIn')
    return {
        type: actionTypes.AUTH_LOGOUT
    }
}

const authSuccess = (token, userid) => {
    localStorage.setItem('token', token);
    localStorage.setItem('userid', userid);
    return {
        type: actionTypes.AUTH_SUCCESS,
        tokenId: token,
        userId: userid
    }
}

const authTimeout = (timer) => {
    return dispatch => {
        setTimeout(() => {
            dispatch(authLogout())
        }, timer * 1000)
    }
}

export const authMethod = (name, email, password, isSignup) => {
    return dispatch => {
        dispatch(authStart())
        const payload = {
            name: name,
            email: email,
            password: password
        }
        let URL = 'http://127.0.0.1:8000/auth/login'
        if (!isSignup) {
            URL = 'http://127.0.0.1:8000/auth/signup'
        }
        Axios.post(URL, payload).then(response => {
            localStorage.setItem('expiresIn', response.data.expiresIn)
            dispatch(authSuccess(response.data.token, response.data.id))
            dispatch(authTimeout(response.data.expiresIn))
        }).catch(err => {
            console.log(err);
            dispatch(authFail(err));
        })
    }
}


export const autoLogin = () => {
    const token = localStorage.getItem('token')
    const userId = localStorage.getItem('userid')
    const expiresIn = localStorage.getItem('expiresIn')
    const chekTime = Math.floor(Date.now() / 1000) < expiresIn
    return dispatch => {
        if (token) {
            if (chekTime) {
                dispatch(authSuccess(token, userId))
            }
            else {
                dispatch(authLogout())
            }
        } else {
            dispatch(authTimeout(expiresIn))
        }
    }
}