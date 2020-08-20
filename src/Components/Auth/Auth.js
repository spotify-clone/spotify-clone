import React , {useState} from 'react';
import {connect} from 'react-redux';
import axios from 'axios';
import {getUser} from '../../Redux/musicReducer';
import Logo from './auth.logo.png'
import './auth.scss';




const Auth = (props) => {
    let [email, setEmail] = useState(''),
    [password, setPassword] = useState('');

    let handleLogin = (e)=>{
        
        axios.post(`/auth/login-user`,{email, password})
        .then((res)=>{
            props.getUser(res.data)
            props.history.push('/dash')
        })
        .catch(err => {
            console.log(err)
            alert('Unauthorized ')
        })
    }
    let handleRegister =(e) => {
         e.preventDefault()
         axios.post(`/auth/new-user`, {email , password})
         .then((res)=>{
             console.log(res)
             alert('User Successfully Registered')
             handleLogin()
         })
         .catch((err)=>{
             console.log(err)
         })
    }

    
    return (
        <div className='auth'>
         <img src={Logo} alt='authLogo' />

        <div className="main">
        
               <input className="auth-input"
               value={email}
               placeholder='E-mail'
               name='email'
               onChange={e => setEmail(e.target.value)}
               />
                <input className="auth-input"
               value={password}
               type='Password'
               placeholder='Password'
               name='password'
               onChange={e => setPassword(e.target.value)}
               />
              
                
                <button className="authBtn" onClick={handleLogin}>Login</button>
                 <h4>Sign Up Here!</h4>
                <button className="authBtn" onClick={handleRegister}>Register</button>
                    
                 
                
                
                 
        </div>
        </div>
    )
}
export default connect(null,{getUser})(Auth)
 
