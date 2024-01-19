import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import '../style/Header.css';

const Header = () => {
  const isLoggedIn = window.localStorage.getItem('token') !== null;
  const userId = localStorage.getItem('userId');

  return (
    <>
      <div className='headermaincontainer'>
        <div className="rightHeader">
          <h1 className='profileLinks'> <a href='/'> Feature Request Board</a> </h1>
        </div>
        <div className="clr"></div>
        <div className="leftHeader">
          {isLoggedIn ?
            <div className='profileLinks'>  
                  <a href={`/profile/${userId}`}>Profile</a> 
            </div> :
            <div className="profileLinks">
              <a href='/login'>Login</a> 
              <span className="divider">|</span>
              <a href='/register'>Register</a>
               
            </div>
          }
        </div>
      </div>
    </>
  );
}

export default Header;
