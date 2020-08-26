import React,{useState} from 'react';
import './header.scss';
import Logo from '../Header/sclogo.png'
import { useHistory } from "react-router"
import SearchIcon from '@material-ui/icons/Search';

const Header = (props) => {
    const [input, setInput] = useState("")
    const history = useHistory()

    //sending user to Search.js
    const sendUser = () =>{
        if(input !== null){
            history.push(`/search/${input}`)
        }
    }



    return(
        <header>
            <div className='search-bar'>
                <img src={Logo} alt='logo' />
                <form onSubmit={sendUser} style={{marginTop: "0%"}}>
                    <SearchIcon onClick={() => sendUser} style={{backgroundColor:"white", position: "absolute", top: "25px", right: "3%"}}/><input type="text" onChange={(e) => setInput(e.target.value)} placeholder="...Artist" />
                </form>
            </div>

        </header>
    )
}
export default Header;
