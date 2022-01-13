import React, { useEffect, useState } from 'react';
import Navbar from './Navbar';
import axios from 'axios';
import Card from './Card';
import Cookie from './Cookie';

function iOS() {
    return [
      'iPad Simulator',
      'iPhone Simulator',
      'iPod Simulator',
      'iPad',
      'iPhone',
      'iPod'
    ].includes(navigator.platform)
    // iPad on iOS 13 detection
    || (navigator.userAgent.includes("Mac") && "ontouchend" in document)
}
  
const Home = ({categories}) => {
    const [articles, setArticles] = useState([]);
    const [showCookie, setShowCookie] = useState(false);
    
    useEffect(() => {
        axios.get('/article/get/recent')
            .then((res) => {
                if(res.status === 200) {
                    setArticles(res.data);
                    const getCookie = localStorage.getItem('cookie');
                    if(getCookie === null && iOS() === false) {
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