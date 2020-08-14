import React from 'react';

import './header.scss';

const Header = ()=>{
    
    return(
        <header>
            <div className='search-bar'>
                <img Logo alt='logo' />
                <input type="text" placeholder="Search.."></input>

            </div>

        </header>
    )
}
export default Header;