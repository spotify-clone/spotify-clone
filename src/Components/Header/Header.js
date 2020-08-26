import React,{useState} from 'react';
import './header.scss';
import Logo from '../Header/sclogo.png'
import { Link } from 'react-router-dom'
import { useHistory } from "react-router"

const Header = (props) => {
    const [input, setInput] = useState("")
    const history = useHistory()

    //sending user to Search.js
    const sendUser = () =>{
        console.log('hit')
        history.push(`/search/${input}`)

    }



    return(
        <header>
            <div className='search-bar'>
                
                <img src={Logo} alt='logo' />
                <form onSubmit={sendUser}>
                    <input type="text" onChange={(e) => setInput(e.target.value)} placeholder="...Artist" />
                </form>
                <Link id='booty' to={`/search/${input}`}><button id='buttz' type="submit">Search Albums</button></Link>
            </div>

        </header>
    )
}
export default Header;
