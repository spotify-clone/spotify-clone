import React,{useState} from 'react';
import './header.scss';
import Logo from '../Header/sc.logo.png'
import { Link } from 'react-router-dom'


const Header = () => {
    const [input, setInput] = useState("")



    return(
        <header>
            <div className='search-bar'>
                
                <img src={Logo} alt='logo' />
                <input type="text" onChange={(e) => setInput(e.target.value)} />
                <Link to={`/search/${input}`}><button>Send Them My way</button></Link>
            </div>

        </header>
    )
}
export default Header;
