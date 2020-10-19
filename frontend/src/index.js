import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom'
import { Provider } from 'react-redux';
import { applyMiddleware, combineReducers, compose, createStore } from 'redux'
import thunk from 'redux-thunk';

import authReducer from './store/reducer/auth';
import projectReducer from './store/reducer/project';
import newProject from './store/reducer/newProject';
import detailsReducer from './store/reducer/ProjectDetails';

import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';


const rootReducer=combineReducers({
  auth:authReducer,
  pro:projectReducer,
  new:newProject,
  details:detailsReducer
})

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(rootReducer,composeEnhancers(applyMiddleware(thunk)));

ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter>
      <React.StrictMode>
        <App />
      </React.StrictMode>
    </BrowserRouter>
  </Provider>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
