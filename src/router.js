import React from 'react';
import { Redirect } from 'react-router-dom';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import MainLayout from './layouts/MainLayout/MainLayout';
import HomePage from './containers/user/HomePage/HomePage';
import CreateAccount from './containers/Account/CreateAccountContainer';
import NotFoundPage from './containers/NotFoundPage/NotFoundPage';
import LoginPage from './containers/LoginPage/LoginPage';
//import CreateAccountContainer from './containers/Account/CreateAccountContainer';
import InfoPage from './containers/user/InfoPage/InfoPage'

const PrivateRoute = ({ component: Component, isAuthenticated, ...rest }) => 
    <Route {...rest} render={props => isAuthenticated ? <Component {...props} /> : <Redirect to='/login' />} />; 

export default function router({ isAuthenticated }) {
    return (
        <BrowserRouter >
            <Switch>
                <Route path='/login' exact component={LoginPage} isAuthenticated={isAuthenticated} />
                {/* <Route path='/register' component={CreateAccountContainer} isAuthenticated={isAuthenticated}/> */}
                <Route path='/register' component={CreateAccount} />
                <MainLayout>
                    <Switch>
                        <PrivateRoute path='/' exact component={HomePage} isAuthenticated={isAuthenticated} />
                        <PrivateRoute path='/me' exact component={InfoPage} isAuthenticated={isAuthenticated} />

                        <Route component={NotFoundPage} />
                    </Switch>
                </MainLayout>
            </Switch>
        </BrowserRouter>
    );
}