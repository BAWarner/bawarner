import React from 'react';
import { Switch, Route } from 'react-router-dom';

import Dashboard from './Components/Dashboard/Dashboard';
import Form from './Components/Form/Form';
import Post from './Components/Post/Post';
import Auth from './Components/Auth/Auth';

export default(
    <Switch>
        <Route
            component={Dashboard}
            path='/dashboard'
        />
        <Route
            component={Form}
            path='/new'
        />
        <Route
            component={Post}
            path='/post/:postid'
        />
        <Route
            component={Auth}
            path='/'
        />
    </Switch>
);