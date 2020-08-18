import React from 'react';
import './header.scss';
import Logo from '../Header/sc.logo.png'

const Header = () => {
    
    return(
        <header>
            <div className='search-bar'>
                
                <img src={Logo} alt='logo' />
                <input type="text" placeholder="Search..."></input>

            </div>

        </header>
    )
}
export default Header;
