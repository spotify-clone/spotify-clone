import React from 'react';
import {Switch, Route} from 'react-router-dom';
import Auth from './Components/Auth/Auth';
import Dash from './Components/Dash/Dash';
// import Profile from './Components/Profile/Profile';
import Search from './Components/Search/Search';
import Chart from './Components/Chart/Chart';
import Player from './Components/Player/Player'
import Chat from './Components/Chat/Chat';
<<<<<<< HEAD
=======
<<<<<<< HEAD
>>>>>>> master
import Drop from './Components/Dropzone/DropZone';
=======
 import Drop from './Components/Dropzone/DropZone';
>>>>>>> master


 
export default (
    <Switch>
        {/* <Route exact path= './landing' component={Landing} /> */}
        <Route path="/auth" component={Auth} />
        <Route path="/dash" component={Dash} />
        {/* <Route path="/profile" component={Profile} /> */}
        <Route path="/search/:artist" component={Search} />
        <Route path="/chart" component={Chart} />
        <Route path="/player" component={Player}/>
        <Route path="/chat" component={Chat} />
<<<<<<< HEAD
=======
        
>>>>>>> master
        <Route path='/drop' component={Drop} />
    </Switch>
)