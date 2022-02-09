import React from 'react';
import cookie from './images/cookie.png';

const Cookie = ({setShowCookie}) => {
    const acceptHandler = () => {
        setShowCookie(false);
        localStorage.setItem('cookie', true);
    }
    return( 
        <div className="cookie" >
            <div>
                <img src={cookie} alt="Cookie" />
                <h1 >Съгласие за бисквитки</h1>
            </div>
            <p style={{paddingLeft: '15px'}}>Този уебсайт използва бисквитки с цел подобряване на вашето преживяване.</p>
            <button onClick={acceptHandler}>Приемам</button>
        </div>
    )
}

export default Cookie;