import React from 'react'
import { Redirect } from 'react-router-dom'

import classes from './Auth.module.css';
import Spinner from '../../components/UI/Spinner/Spinner';
import { Button, FormControl, IconButton, InputAdornment, InputLabel, OutlinedInput } from '@material-ui/core';
import { Visibility, VisibilityOff } from '@material-ui/icons';
import VpnKeyIcon from '@material-ui/icons/VpnKey';

const auth = props => {
    let styles = {
        width: '80%',
        margin: '2 0'
    }
    let Signup = null;
    if (!props.isSignIn) {
        Signup = (
            <div className={classes.Element} >
                <FormControl style={styles} variant="outlined">
                    <InputLabel htmlFor="outlined-adornment-name">Name</InputLabel>
                    <OutlinedInput
                        autoComplete='false'
                        id="outlined-adornment-name"
                        type='text'
                        value={props.formData.name.value}
                        onChange={(event) => props.inputChangeHandler(event, 'name')}
                        labelWidth={38}
                    />
                </FormControl>
            </div>
        )
    }
    let loading = (
        <form className={classes.Continer} onSubmit={(event) => props.formSubmit(event)}  >
            {Signup}

            <div className={classes.Element} >
                <FormControl style={styles} variant="outlined">
                    <InputLabel htmlFor="outlined-adornment-email">Email</InputLabel>
                    <OutlinedInput
                        autoComplete='false'
                        id="outlined-adornment-email"
                        type='email'
                        value={props.formData.email.value}
                        onChange={(event) => props.inputChangeHandler(event, 'email')}
                        labelWidth={38}
                    />
                </FormControl>
            </div>
            <div className={classes.Element} >
                <FormControl style={styles} variant="outlined">
                    <InputLabel htmlFor="outlined-adornment-password">Password</InputLabel>
                    <OutlinedInput
                        autoComplete='false'
                        id="outlined-adornment-password"
                        value={props.formData.password.value}
                        onChange={(event) => props.inputChangeHandler(event, 'password')}
                        type={props.showPassword ? 'text' : 'password'}
                        endAdornment={
                            <InputAdornment position="end">
                                <IconButton
                                    aria-label="toggle password visibility"
                                    onClick={props.handleClickShowPassword}
                                    edge="end"
                                >
                                    {props.showPassword ? <Visibility /> : <VisibilityOff />}
                                </IconButton>
                            </InputAdornment>
                        }
                        labelWidth={70}
                    />
                </FormControl>
            </div>
            <Button
                style={{
                    margin: ' 1rem auto',
                    display: 'flex',
                    justifyContent: 'space-around',
                    width: '100',
                    fontSize: '1.3rem'
                }}
                size="large"
                type='submit'
                variant="contained"
                color="primary"
                className={classes.button}
                disabled={!props.isDisable}
            >
                {props.isSignIn ? 'LOGIN' : 'SIGN UP'} <VpnKeyIcon style={{ marginLeft: '10px' }} />
            </Button>

        </form>
    );
    if (props.loading) {
        loading = <Spinner />
    }
    let redirect = null;
    if (props.token) {
        redirect = <Redirect to='/' />
    }
    return (
        <React.Fragment>
            {redirect}
            <div className={classes.Tab}>
                {props.error ? <p className={classes.Error}>{props.error}</p> : null}
                <div className={classes.Method}>
                    <h1 className={classes.Login}>
                        {props.isSignIn ? 'LOGIN' : 'SIGN UP'}
                    </h1>
                </div>
                {loading}
                <p >Switch to
                <Button onClick={() => props.switchSignMethod()} style={{ marginLeft: '10px' }} variant='outlined' color='primary'>{props.isSignIn ? 'SIGN UP' : 'LOGIN'}</Button>
                </p>
            </div>
        </React.Fragment>
    );

}

export default auth;