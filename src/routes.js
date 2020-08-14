import React from 'react'
import {Switch, Route} from 'react-router-dom'
import DropZone from './Components/DropZone'

export default (
    <Switch>
        <Route component={DropZone}  to='/drop'/>
    </Switch>
)