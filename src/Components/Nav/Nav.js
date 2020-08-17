import React, {useState, useEffect} from 'react'
import axios from 'axios'
import {connect} from 'react-redux'
import {getUser} from '../../Redux/musicReducer'

const Nav = (props) => {

    const [user, setUser] = useState([])

    useEffect(()=>{
        getUser()
        
    },[user])

    const getUser =()=>{
        axios.get('/api/user')
        .then(res => {
            if(res.data && res.data.length !== user.length){
                setUser(res.data)
                props.getUser(res.data)
            }
        })
        .then(() =>{
            axios.post(`/api/user/${user.display_name}`)
        })
        .catch(error => console.log(error))
    }





console.log(props.user['display_name'])
console.log(user)

    return (
        <div>
           <h1>Nav</h1> 
        </div>
    )
}

const mapStateToProps = state => state

export default connect(mapStateToProps,{getUser})(Nav)
