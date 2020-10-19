import React from 'react';
import classes from './Error.module.css'
import CloseIcon from '@material-ui/icons/Close';
import { Button, withStyles } from '@material-ui/core';

const styles = {
    root: {
        position: 'absolute',
        top: '10px',
        right: '10px',

    }
}
const error = props => {
    const cls = [classes.Main]
    const closeModal = () => {
        if (props.closeModal) {
            cls.push(classes.None)
        }
    }
    return (
        <>
            <div>
                <div className={cls.join(' ')}>
                    <div className={classes.ErrorModal}>
                        <h2 className={classes.error}>
                            {props.children}
                        </h2>
                        <Button variant='outlined'
                            onClick={() => closeModal()}
                            color='secondary'
                            style={styles.root}>
                            <CloseIcon />
                        </Button>
                    </div>
                </div>
            </div>
        </>
    )
}

export default withStyles(styles)(error);