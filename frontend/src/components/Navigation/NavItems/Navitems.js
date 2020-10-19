
import React from 'react';

import Navitem from './Navitem/Navitem';
import classes from './Navitems.module.css';

const navitems = props => {
    let route = (
        <Navitem link='/login'>SIGNIN</Navitem>
    )
    if (props.isAuth) {
        route = (
            <React.Fragment>
                <Navitem link='/'>HOME</Navitem>
                <Navitem link='/newProject'>New Project</Navitem>
                <Navitem link='/logout'>LOGOUT</Navitem>
            </React.Fragment>
        )
    }

    return (
        <ul className={classes.NavigationItems}>
            {route}
        </ul>
    )
}


export default navitems;