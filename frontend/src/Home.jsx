import React, { useEffect, useState } from 'react';
import Navbar from './Navbar';
import axios from 'axios';
import Card from './Card';

const Home = ({categories}) => {
    const [articles, setArticles] = useState([]);
    useEffect(() => {
        axios.get('/article/get/recent')
            .then((res) => {
                if(res.status === 200) {
                    setArticles(res.data);
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
        </div>
    </>
    )
}

export default Home;