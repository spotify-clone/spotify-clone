import React, {useState, useEffect} from 'react'
import axios from 'axios'
import {connect} from 'react-redux'
import {getUser} from '../../Redux/musicReducer'

function Nav(props) {

    const [user, setUser] = useState([])

    useEffect(()=>{
        getUser()
    },[])

    
    const getUser =()=>{
        axios.get('/api/user')
        .then(res => {
            if(res.data && res.data.length !== user.length){
                console.log(res.data)
                setUser(res.data)
                // props.getUser(res.data)
            }
        })
        .catch(error => console.log(error))
    }





    console.log(user)

    return (
        <div>
            <h1>Nav Component</h1>
            
        </div>
    )
}

const mapStateToProps = state => state

export default connect(mapStateToProps,{getUser})(Nav)
