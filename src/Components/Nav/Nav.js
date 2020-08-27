import React, {useState, useEffect} from 'react';
import axios from 'axios';
import {connect} from 'react-redux';
import {getUser} from '../../Redux/musicReducer';
import {Link} from 'react-router-dom';
import './nav.scss';
import Button from '@material-ui/core/Button';
import { useHistory } from "react-router"

const Nav = (props) => {

    const [user, setUser] = useState([])
    const history = useHistory()

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
        // .then(() =>{
        //     axios.post(`/api/user/${user.id}`)
        // })
        .catch(error => console.log(error))
    }

    const logOut = () => {
        axios.get('/auth/logOut')
        .then (() => {
        history.push('/')
        })
        .catch(err => console.log(err)
        )}


       
    return (
        <div className='main-nav'>
            <nav className='desktop-nav'>
                <ul>
                    
                    <li>
                        <Link to='/dash'>Dash</Link>
                    </li>
                    <li>
                        <Link to='/profile'>Profile</Link>
                    </li>
                    {/* <li>
                        <Link to='/Search'>Search</Link>
                    </li> */}
                    <li>
                        <Link to='/Chart'>Chart</Link>
                    </li>
                    <li>
                        <Link to='/Chat'>Chat</Link>
                    </li>
                    <li className='profilePic'>
                        <img src={props.music.user.pic} id='pixed' alt='beautiful person information'/>
                    </li>
                </ul>
                {props.user ? <div className="logout-btn"><Button onClick={logOut} variant="outlined" color="secondary">Logout</Button></div> : null}
            </nav>
        </div>
    )
}

const mapStateToProps = state => state

export default connect(mapStateToProps,{getUser})(Nav)
