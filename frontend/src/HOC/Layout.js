import React, { Component } from 'react';
import InstagramIcon from '@material-ui/icons/Instagram';
import FacebookIcon from '@material-ui/icons/Facebook';
import TwitterIcon from '@material-ui/icons/Twitter';

import Navbar from '../components/Navigation/Navbar';
import classes from './Layout.module.css';
import {connect} from 'react-redux';
import {autoLogin} from '../store/action/authActions';

class Layout extends Component{
    componentDidMount(){
        this.props.autologin()
    }
    render(){
        return(
            <React.Fragment>
                <div>
                    <Navbar isAuth={this.props.isAuth}/>
                </div>
                <main className={classes.main_section} >
                    {this.props.children}
                </main>
                <footer className={classes.footer}>
                    <p>CPOYRIGHT © 2020-2021</p>
                    <div className={classes.Icon}><InstagramIcon/></div>
                    <div className={classes.Icon}><FacebookIcon/></div>
                    <div className={classes.Icon}><TwitterIcon/></div>
                </footer>
            </React.Fragment>
        )
    }
}

const mapStateToProps=state=>{
    return{
        isAuth:state.auth.tokenId
    }
}

const mapDispatchToProps=dispatch=>{
    return{
        autologin:()=>dispatch(autoLogin())
    }
}
export default connect(mapStateToProps,mapDispatchToProps)(Layout);