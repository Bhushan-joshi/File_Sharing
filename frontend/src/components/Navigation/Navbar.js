import React from 'react';
import classes from './Navbar.module.css';
import Navitems from './NavItems/Navitems';
import DescriptionOutlineIcon from '@material-ui/icons/Description';
const navbar = props => {
    return (
        <nav className={classes.Main_nav}>
            <div classes={classes.Logo}>
                <DescriptionOutlineIcon style={{ fontSize: 45 }} />
            </div>
            <Navitems isAuth={props.isAuth}/>
        </nav>
    )
}
export default navbar;