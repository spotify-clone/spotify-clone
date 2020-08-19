import React , {useState} from 'react';
import {connect} from 'react-redux';
import axios from 'axios';
import {getUser} from '../../Redux/musicReducer';
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
        <div>
        

        <div className="main-div">
           <form className="form-div" >
               <input
               value={email}
               placeholder='E-mail'
               name='email'
               onChange={e => setEmail(e.target.value)}
               />
                <input
               value={password}
               placeholder='Password'
               name='password'
               onChange={e => setPassword(e.target.value)}
               />
                 </form>
                 <div className="button-div">
                 <button className="btn1"onClick={handleLogin}>Login</button>
                 <h4>Click To
                     <button onClick={handleRegister}>Register</button>
                     New User
                 </h4>

                 </div>
                
                 
        </div>
        </div>
    )
}
export default connect(null,{getUser})(Auth)
 
