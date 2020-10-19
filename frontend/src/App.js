import React, { Component } from 'react';
import './App.css';

import Layout from './HOC/Layout';
import Card from './containers/Cards/CardDisplay';
import DetailCard from './containers/Details/Details';
import Auth from './containers/Auth/Auth';
import { Route, Switch } from 'react-router-dom';
import NewProject from './containers/NewProject/NewProject';
import { connect } from 'react-redux';

import Logout from './containers/Auth/Logout/Logout';

class App extends Component {

  render() {
    let render = (
      <Switch>
        <Route path='/Login' component={Auth} />
      </Switch>
    )
    if (this.props.isAuth) {
      render = (<Switch>
        <Route path='/details/:id' component={DetailCard} />
        <Route path='/newProject' component={NewProject} />
        <Route path='/logout' component={Logout}/>
        <Route path='/Login' component={Auth} />
        <Route path='/' exact component={Card} />

      </Switch>)
    }

    return (
      <Layout >
        <Switch>
          {render}
        </Switch>
      </Layout>
    );
  }
}
const mapStateToProps = state => {
  return {
    isAuth: state.auth.tokenId
  }
}
export default connect(mapStateToProps)(App);
