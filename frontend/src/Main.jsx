import React, { useEffect, useState } from 'react';
import Upload from './Upload';
import { useLocation } from 'react-router-dom';
import axios from 'axios';
import Card from './Card';
import Update from './Update';
import CreateCategory from './CreateCategory.jsx';

const Main = () => {
    const [page, setPage] = useState(0);
    const [text, setText] = useState('');
    const [article, setArticle] = useState({});
    const location = useLocation();
    const [name, setName] = useState('');
    const [articles, setArticles] = useState([]);
    const [editableArticle, setEditableArticle] = useState({});

    useEffect(() => {
        setName(location.pathname.replace('/admin/', ''));
        axios.get(`/article/get/byAdmin/${location.pathname.replace('/admin/', '')}`).then(res => {
            if(res.status === 200) {
                setArticles(res.data)
            }
        }).catch(err => {
            console.error(err);
        })

    }, [location.pathname, page]);

    return (
        <div className="Main">
            {
                page === 0 ? (
                    <div className='adminb'>
                        <h1 className='center'>Твоите статии :</h1>
                        <div style={{display: 'flex', alignItems: 'center', gap: '3rem'}}>
                            <button onClick={() => {setPage(1)}}className='btn'>Нова Статия</button>
                            <button className='btn' onClick={() => {setPage(3)}}>Нова Категория</button>
                        </div>
                        <div className="grid">
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
                                            type={2}
                                            setPage={setPage}
                                            setEditableArticle={setEditableArticle}
                                        />
                                    )
                                })
                            }
                        </div>
                       
                    </div>
                ) : page === 1 ? (
                    <Upload 
                        setPage={setPage} 
                        setText={setText}
                        text={text}
                        article={article}
                        setArticle={setArticle}
                        name={name}
                    /> 
                ) : page === 2 ? ( 
                    <Update article={editableArticle} setPage={setPage}/>
                ) : page === 3 ? (
                    <div>
                        <CreateCategory setPage={setPage}/>
                    </div>
                ) : <></>
            }
           
        </div>
    )
}

export default Main;