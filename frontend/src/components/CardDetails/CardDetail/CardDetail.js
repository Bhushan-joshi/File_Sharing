import { Button } from '@material-ui/core';
import React from 'react';
import classes from './CardDetail.module.css';

const detail = props => {
    return (
        <React.Fragment>
            <Button onClick={()=>props.getFile()} fullWidth variant='contained'>
                <div
                    className={classes.Paper}
                >{props.fName}
                </div>
            </Button>
        </React.Fragment>
    )
}

export default detail;