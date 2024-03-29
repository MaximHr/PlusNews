import React, { useEffect, useState } from 'react';
import Navbar from './Navbar';
import axios from 'axios';
import Card from './Card';
import { useLocation } from 'react-router';

const Category = ({categories}) => {
    const [category, setCategory] = useState('');
    const location = useLocation();
    const [articles, setArticles] = useState([]);
    useEffect(() => {
        setCategory(decodeURI(location.pathname.replace('/category/', '')));

        axios.get(`/article/get/byCategory/${decodeURI(location.pathname.replace('/category/', ''))}`)
            .then((res) => {
                if(res.status === 200) {
                    setArticles(res.data);
                }
            }).catch(err => {
                console.log(err);
            })
    }, [location.pathname])
    return(
    <>
        <Navbar 
            setArticles={setArticles} 
            categories={categories} 
            category={decodeURI(location.pathname.replace('/category/', ''))}
        />
        <div className="home">
            <div className="container">
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

export default Category;