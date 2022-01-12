import React from 'react';
import cookie from './images/cookie.png';

function setCookie(name,value,days) {
    var expires = "";
    if (days) {
        var date = new Date();
        date.setTime(date.getTime() + (days*24*60*60*1000));
        expires = "; expires=" + date.toUTCString();
    }
    document.cookie = name + "=" + (value || "")  + expires + "; path=/";
}

const Cookie = ({setShowCookie}) => {
    const acceptHandler = () => {
        setShowCookie(false);
        setCookie('cookie', true);
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