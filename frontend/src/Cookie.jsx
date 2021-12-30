import React from 'react';
import cookie from './images/cookie.png';

const Cookie = ({setShowCookie}) => {
    const acceptHandler = () => {
        setShowCookie(false);
        localStorage.setItem('cookie', true);
    }
    return( 
        <div className="cookie">
            <div>
                <img src={cookie} alt="Cookie" />
                <h1>Cookie Consent</h1>
            </div>
            <p>This website uses cookies to provide better browsing experince on our website.</p>
            <button onClick={acceptHandler}>Accept</button>
        </div>
    )
}

export default Cookie;