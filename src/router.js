import React from 'react';
import { Redirect } from 'react-router-dom';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import MainLayout from './layouts/MainLayout/MainLayout';
import HomePage from './containers/HomePage/HomePage';
import NotFoundPage from './containers/NotFoundPage/NotFoundPage';
import LoginPage from './containers/LoginPage/LoginPage';

const PrivateRoute = ({ component: Component, isAuthenticated, ...rest }) => 
    <Route {...rest} render={props => isAuthenticated ? <Component {...props} /> : <Redirect to='/login' />} />; 

export default function router({ isAuthenticated }) {
    return (
        <BrowserRouter >
            <MainLayout>
                <Switch>
                    <Route path='/login' exact component={LoginPage} isAuthenticated={isAuthenticated} />
                    <PrivateRoute path='/' exact component={HomePage} isAuthenticated={isAuthenticated} />
                    <Route component={NotFoundPage} />
                </Switch>
            </MainLayout>
        </BrowserRouter>
    );
}