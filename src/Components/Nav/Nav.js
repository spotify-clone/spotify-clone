import React, {useState, useEffect} from 'react';
import axios from 'axios';
import {connect} from 'react-redux';
import {getUser} from '../../Redux/musicReducer';
import {Link} from 'react-router-dom';
import './nav.scss';

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
        // .then(() =>{
        //     axios.post(`/api/user/${user.id}`)
        // })
        // .catch(error => console.log(error))
    }

    const logOut = () => {
        axios.get('/auth/logOut')
        .then (() => {
        props.history.push('/')
        })
        .catch(err => console.log(err)
        )}


console.log(props.music.user.pic)
    return (
        <div className='main-nav'>
            <nav className='desktop-nav'>
                <ul>
                    
                    <li>
                        <Link to='/dash'>Dash</Link>
                    </li>
                    <li>
                        <Link to='/drop'>Profile</Link>
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
                    {props.user ?<Link to='/'
                             onClick={logOut} >Logout</Link> : null}
                    <li className='profilePic'>
                        <img src={props.music.user.pic}  alt='beautiful person picture'/>
                    </li>
                </ul>
            </nav>
        </div>
    )
}

const mapStateToProps = state => state

export default connect(mapStateToProps,{getUser})(Nav)
