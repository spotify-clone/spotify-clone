import React, {useState, useEffect} from 'react'
import axios from 'axios'
import {connect} from 'react-redux'
import getUser from '../../Redux/musicReducer'

function Nav(props) {

    const [user, setUser] = useState([])

    useEffect(()=>{
        getUser()
    })

    const getUser =()=>{
        axios.get('/api/user')
        .then(res => {
            if(res.data && res.data.length !== user.length){
                setUser(res.data)
            }
        })
        .catch(error => console.log(error))
    }





    console.log(user)

    return (
        <div>
            
        </div>
    )
}

const mapStateToProps = state =>{
    return{
        user:state.user
    }
}

export default connect(mapStateToProps)(Nav)
