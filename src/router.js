import React from 'react';
import { Redirect } from 'react-router-dom';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import MainLayout from './layouts/MainLayout/MainLayout';
import HomePage from './containers/user/HomePage/HomePage';
import NotFoundPage from './containers/NotFoundPage/NotFoundPage';
import LoginPage from './containers/LoginPage/LoginPage';
import SignupPage from './containers/SignupPage/SignUp';
import InfoPage from './containers/user/InfoPage/InfoPage'
import NoPermissionPage from './containers/NoPermissionPage/NoPermissionPage';
import ApprovePage from './containers/admin/ApprovePage/AppovePage';
import DeleteAccountPage from './containers/admin/DeleteAccountPage/DeleteCountPage';
import HistoryPage from './containers/user/HistoryPage/HistoryPage';
import ContentManagePage from './containers/admin/ContentManagePage/ContentManagePage';
import CreateAccountPage from './containers/admin/CreateAcountPage/CreateAccountPage';
import PostPage from './containers/user/PostPage/PostPage';

const PrivateRoute = ({ component: Component, isAuthenticated, ...rest }) => 
    <Route {...rest} render={props => isAuthenticated ? <Component {...props} /> : <Redirect to='/login' />} />; 

const NeedPermissionRoute = ({ component: Component, isAuthenticated, userPermission, routePermisison, ...rest }) => {
    if (!isAuthenticated) return <Route render={() => <Redirect to='/login' />} />;

    if (!routePermisison.includes(userPermission)) return <Route render={() => <Redirect to='/no-permission' />} />;

    return <Route {...rest} component={Component} />
}

export default function router({ isAuthenticated, permission, username }) {
    return (
        <BrowserRouter >
            <Switch>
                <Route path='/signup' exact component={SignupPage} isAuthenticated={isAuthenticated} />
                <Route path='/login' exact component={LoginPage} isAuthenticated={isAuthenticated} />
                <MainLayout permission={permission} username={username}>
                    <Switch>
                        <PrivateRoute path='/' exact component={HomePage} isAuthenticated={isAuthenticated} />
                        <PrivateRoute path='/me' exact component={InfoPage} isAuthenticated={isAuthenticated} />
                        <PrivateRoute path="/no-permission" component={NoPermissionPage} isAuthenticated={isAuthenticated} />
                        <PrivateRoute path="/history" exact component={HistoryPage} isAuthenticated={isAuthenticated} />
                        
                        <NeedPermissionRoute path="/post/:postId" routePermisison={[0, 1]} component={PostPage} isAuthenticated={isAuthenticated} userPermission={permission} />
                        <NeedPermissionRoute path="/approve" routePermisison={[3, 4, 5]} component={ApprovePage} isAuthenticated={isAuthenticated} userPermission={permission} /> 
                        <NeedPermissionRoute path="/delete-account" routePermisison={[3, 4, 5]} component={DeleteAccountPage} isAuthenticated={isAuthenticated} userPermission={permission} />
                        <NeedPermissionRoute path="/ContentManage" routePermisison={[3, 4, 5]} component={ContentManagePage} isAuthenticated={isAuthenticated} userPermission={permission} />
                        <NeedPermissionRoute path="/CreateAccountAdmin" routePermisison={[3, 4, 5]} component={CreateAccountPage} isAuthenticated={isAuthenticated} userPermission={permission} />
                        <Route component={NotFoundPage} />
                    </Switch>
                </MainLayout>
            </Switch>
        </BrowserRouter>
    );
}