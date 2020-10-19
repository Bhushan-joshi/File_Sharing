import { Button, FormControl, InputLabel, OutlinedInput } from '@material-ui/core';
import React from 'react';
import CloudUploadIcon from '@material-ui/icons/CloudUpload';
import classes from './CreateProject.module.css';
import Spinner from '../UI/Spinner/Spinner';
import { Redirect } from 'react-router-dom';

const newProject = props => {
    const styles = {
        width: '80%',
        margin: '2 20'
    }
    let form = (
        <form id="newProject" onSubmit={event => props.onSubmit(event)} className={classes.Continer}>
            <div className={classes.Element} >
                <FormControl style={styles} variant="outlined">
                    <InputLabel htmlFor="outlined-adornment-name">Name</InputLabel>
                    <OutlinedInput
                        autoComplete='false'
                        id="outlined-adornment-name"
                        type='text'
                        value={props.formData.name.value}
                        onChange={(event) => props.inputChangeHandler(event, 'name')}
                        labelWidth={40}
                    />
                </FormControl>
            </div>
            <div className={classes.Element} >
                <FormControl style={styles} variant="outlined">
                    <InputLabel htmlFor="outlined-adornment-desc">Description</InputLabel>
                    <OutlinedInput
                        autoComplete='false'
                        id="outlined-adornment-desc"
                        type='text'
                        value={props.formData.desc.value}
                        onChange={(event) => props.inputChangeHandler(event, 'desc')}
                        labelWidth={80}
                    />
                </FormControl>
            </div>
            <div className={classes.Element}>
                <FormControl style={styles} variant="outlined">
                    <OutlinedInput
                        autoComplete='false'
                        type="file"
                        id="outlined-adornment-file"
                        placeholder='File'
                        onChange={(event) => props.onFileChange(event)}
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
            >
                Upload < CloudUploadIcon style={{ marginLeft: '15px' }} />
            </Button>
        </form>
    )
    if (props.loading) {
        form = <Spinner />
    }
    let redirect = null;
    if (props.redirect) {
        redirect = <Redirect to='/' />
    }
    return (
        <div className={classes.Tab}>
            {redirect}
            {props.error ? <p className={classes.Error}>{props.error}</p> : null}
            <h1 className={classes.Login}>Create New Project</h1>
            {form}
        </div >
    )
}

export default newProject;