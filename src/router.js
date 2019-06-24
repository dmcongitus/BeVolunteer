import React from 'react';
import { Redirect } from 'react-router-dom';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

//Chung
import MainLayout from './layouts/MainLayout/MainLayout';
import HomePage from './containers/user/HomePage/HomePage';
import NotFoundPage from './containers/NotFoundPage/NotFoundPage';
import LoginPage from './containers/LoginPage/LoginPage';
import SignupPage from './containers/SignupPage/SignUp';
import NoPermissionPage from './containers/NoPermissionPage/NoPermissionPage';
//Người dùng
import InfoPage from './containers/user/InfoPage/InfoPage'
import SearchPage from './containers/user/SearchPage/SearchPage';
import HistoryPage from './containers/user/HistoryPage/HistoryPage';
import RankPage from './containers/user/RankPage/RankPage';
import MedalPage from './containers/user/MedalPage/MedalPage';
//admin
import AdminManagePage from './containers/admin/AdminManagePage/AdminManagePage';
import ApprovePage from './containers/admin/ApprovePage/AppovePage';
import DeleteAccountPage from './containers/admin/DeleteAccountPage/DeleteCountPage';
import ContentManagePage from './containers/admin/ContentManagePage/ContentManagePage';
import EventManagePage from './containers/admin/EventtManagePage/EventManagePage';
import EventManageDetailPage from './containers/admin/EventtManagePage/EventManageDetail/EventManageDetail';
import CreateAccountPage from './containers/admin/CreateAcountPage/CreateAccountPage';
//Post
import PostPage from './containers/user/PostPage/PostPage';
//Event
import EventPage from './containers/user/PostPage/EventPage';
import CheckinPage from './containers/user/CheckinPage/CheckinPage';
import CreateEvent from './containers/admin/EventPage/CreateEvent/CreateEvent';
import EventList from './containers/admin/EventPage/EventList/EventList.js';
import EventEditPage from './containers/admin/EventPage/EventEdit/EventEditPage';



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
                        <PrivateRoute path="/checkin" exact component={CheckinPage} isAuthenticated={isAuthenticated} />
                        
                        <PrivateRoute path="/history" exact component={HistoryPage} isAuthenticated={isAuthenticated} />
                        <PrivateRoute path="/rank" exact component={RankPage} isAuthenticated={isAuthenticated} />
                        <PrivateRoute path="/rank/:page" exact component={RankPage} isAuthenticated={isAuthenticated} />
                        <PrivateRoute path="/medal" exact component={MedalPage} isAuthenticated={isAuthenticated} />
                        <PrivateRoute path='/event' exact component={CreateEvent} isAuthenticated={isAuthenticated} />
                        <PrivateRoute path='/eventList' exact component={EventList} isAuthenticated={isAuthenticated} />
                       
                        <PrivateRoute path='/searchPage/:searchText' exact component={SearchPage} isAuthenticated={isAuthenticated} />
                        <NeedPermissionRoute path="/eventMore/:eventId" routePermisison={['USER', 'ORG', 'CONTENT_MOD','ACCOUNT_MOD','UNIT_ADMIN','SUPER_ADMIN']} component={EventPage} isAuthenticated={isAuthenticated} userPermission={permission} />

                        <NeedPermissionRoute path="/eventEdit/:eventId/" routePermisison={['USER', 'ORG', 'CONTENT_MOD','ACCOUNT_MOD','UNIT_ADMIN','SUPER_ADMIN']} component={EventEditPage} isAuthenticated={isAuthenticated} userPermission={permission} />
                        <NeedPermissionRoute path="/post/:postId" routePermisison={['USER', 'ORG', 'CONTENT_MOD','ACCOUNT_MOD','UNIT_ADMIN','SUPER_ADMIN']} component={PostPage} isAuthenticated={isAuthenticated} userPermission={permission} />
                        <NeedPermissionRoute path="/approve" routePermisison={['ACCOUNT_MOD','UNIT_ADMIN','SUPER_ADMIN']} component={ApprovePage} isAuthenticated={isAuthenticated} userPermission={permission} /> 
                        <NeedPermissionRoute path="/admin-account" routePermisison={['UNIT_ADMIN','SUPER_ADMIN']} component={AdminManagePage} isAuthenticated={isAuthenticated} userPermission={permission} />
                        <NeedPermissionRoute path="/delete-account" routePermisison={['ACCOUNT_MOD','UNIT_ADMIN','SUPER_ADMIN']} component={DeleteAccountPage} isAuthenticated={isAuthenticated} userPermission={permission} />
                        <NeedPermissionRoute path="/ContentManage" routePermisison={['CONTENT_MOD','UNIT_ADMIN','SUPER_ADMIN']} component={ContentManagePage} isAuthenticated={isAuthenticated} userPermission={permission} />
                        <NeedPermissionRoute path="/EventManage" routePermisison={['CONTENT_MOD','UNIT_ADMIN','SUPER_ADMIN']} component={EventManagePage} isAuthenticated={isAuthenticated} userPermission={permission} />
                        <NeedPermissionRoute path="/EventManageDetail/:eventId" routePermisison={['CONTENT_MOD','UNIT_ADMIN','SUPER_ADMIN']} component={EventManageDetailPage} isAuthenticated={isAuthenticated} userPermission={permission} />
                        <NeedPermissionRoute path="/CreateAccountAdmin" routePermisison={['UNIT_ADMIN','SUPER_ADMIN']} component={CreateAccountPage} isAuthenticated={isAuthenticated} userPermission={permission} />
                        <Route path="*" component={NotFoundPage} />
                    </Switch>
                </MainLayout>
            </Switch>
        </BrowserRouter>
    );
}