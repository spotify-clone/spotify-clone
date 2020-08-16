<<<<<<< HEAD
import React from 'react'

const Nav = () => {
=======
import React, {useState, useEffect} from 'react'
import axios from 'axios'

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

>>>>>>> 93c39de51e8ef16e25e93dd22202de22a4dfb6c2
    return (
        <div>
            
        </div>
    )
}

<<<<<<< HEAD
export default Nav
=======
export default Nav
>>>>>>> 93c39de51e8ef16e25e93dd22202de22a4dfb6c2
