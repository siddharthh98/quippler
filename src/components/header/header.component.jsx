import { Button } from '@material-ui/core';
import React from 'react';
import { auth, signInWithGoogle } from '../../firebase.utils';

import './header.style.scss';
  
const Header = ({ currentUser }) => {
    return (
        <div className='header'>
            <h4 className='header__logo' to='/'> Q U I P P L E R</h4>
            {
                currentUser ?
                <h4>Welcome back {currentUser.displayName}, <span className='header__signout' onClick={() => auth.signOut()}>Sign Out</span></h4>
                :
                <button className='header__signin' onClick={ signInWithGoogle }>Sign In</button> 
            }
            
        </div>
    );
}

export default Header;
