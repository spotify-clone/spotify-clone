import React from 'react';
import {Switch, Route} from 'react-router-dom';
import Auth from './Components/Auth/Auth';
import Dash from './Components/Dash/Dash';
import Search from './Components/Search/Search';
import Chart from './Components/Chart/Chart';
import Chat from './Components/Chat/Chat';
import Drop from './Components/Dropzone/DropZone';
import Profile from './Components/Profile/Profile';


 
export default (
    <Switch>
        <Route exact path="/" component={Auth} />
        <Route path="/dash" component={Dash} />
        <Route path="/profile" component={Profile} />
        <Route path="/search/:artist" component={Search} />
        <Route path="/chart" component={Chart} />
        <Route path="/chat" component={Chat} />
        <Route path='/drop' component={Drop} />
    </Switch>
)