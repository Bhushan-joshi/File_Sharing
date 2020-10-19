import React from 'react';
import classes from './Spinner.module.css';

const spinner=props=>(
<React.Fragment><div className={classes.loader}>Loading...</div></React.Fragment>
)

export default spinner;