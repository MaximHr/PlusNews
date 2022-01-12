import React, { useEffect, useState } from 'react';
import Navbar from './Navbar';
import axios from 'axios';
import Card from './Card';
import Cookie from './Cookie';

function getCookie(name) {
    var nameEQ = name + "=";
    var ca = document.cookie.split(';');
    for(var i=0;i < ca.length;i++) {
        var c = ca[i];
        while (c.charAt(0)==' ') c = c.substring(1,c.length);
        if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length,c.length);
    }
    return null;
}

const Home = ({categories}) => {
    const [articles, setArticles] = useState([]);
    const [showCookie, setShowCookie] = useState(false);
    
    useEffect(() => {
        axios.get('/article/get/recent')
            .then((res) => {
                if(res.status === 200) {
                    setArticles(res.data);
                    const getCookieAlert = getCookie('cookie')
                    if(getCookieAlert === null) {
                        setShowCookie(true);
                    }
                }
            }).catch(err => {
                console.log(err);
            })
    }, [])
    return(
    <>
        <Navbar setArticles={setArticles} categories={categories}/>
        <div className="home">
            <div className='container'>
            {
                articles.map(article => {
                    return (
                        <Card 
                            title={article.title} 
                            author={article.author} 
                            category={article.category} 
                            url={article.articleImage}
                            date={article.postDate}
                            article={article}
                            key={article._id}
                            type={1}
                        />
                    )
                })
            }
            </div>
            {
                showCookie ? (<>
                    <div className="background"></div>
                    <Cookie setShowCookie={setShowCookie}/>
                </>) : <></>
            }
        </div>
    </>
    )
}

export default Home;