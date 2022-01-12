import React, { useEffect, useState } from 'react';
import ReactHtmlParser from 'react-html-parser';
import { useLocation } from 'react-router';
import axios from 'axios';
import Navbar from './Navbar';
import { 
    FacebookShareButton, 
    FacebookIcon,  
    TwitterShareButton, 
    TwitterIcon
} from 'react-share';

const Article = () => {
    const [size, setSize] = useState(100);
    const location = useLocation();
    const [id, setId] = useState('');
    const [article, setArticle] = useState({});
    const [categories, setCategories] = useState([]);
    
    useEffect(() => {
        setId(location.pathname.replace('/article/', ''));
        axios.get(`/article/get/byId/${location.pathname.replace('/article/', '')}`)
            .then(res => {
                if(res.status === 200 && res.data != '') {
                    setArticle(res.data)

                    //checks if it is a new visitor and if not - saves it
                    const getItem = localStorage.getItem(location.pathname.replace('/article/', ''));
                    if(getItem === null) {
                        localStorage.setItem(location.pathname.replace('/article/', ''), 'true');

                        axios.put(`/article/newViewer/${location.pathname.replace('/article/', '')}`, 1)
                            .then(res => {
                                console.log(res.data)
                            }).catch(err => console.log(err))
                    
                    } 

                } else {
                    setArticle({text: '<center><h1>Тази страница не е на лице</h1><center/>', author: 'PlusNews.bg'})
                }
            })
            .catch(err => {
                setArticle({text: '<center><h1>Тази страница не е на лице</h1><center/>', author: 'PlusNews.bg'})
            });

        axios.get('/category/get')
            .then(res => {
                if(res.status === 200){ 
                    setCategories(res.data);
                }
            }).catch(err => {
                console.log(err);
            })
    }, []);

    return( 
        <>
            <Navbar categories={categories} isArticle={true}/>
            <div className='Article'>
                <div className="container" style={{
                    zoom: size + '%'
                }}>
                    {ReactHtmlParser(article.text)}
                    <hr />
                    <p className='article-author'>Автор: {article.author}</p>
                </div>
                <div className="together">
                    <p>Сподели Статията: </p>
                    <FacebookShareButton 
                        className='share'
                        quote={article.title} 
                        hashtag='news' 
                        url='http://plusnews.bg'
                    >
                        <FacebookIcon size={50}/>
                    </FacebookShareButton>
                    <TwitterShareButton 
                        url='http://plusnews.bg'
                        className='share'
                        title={article.title}
                        hashtags={['news']}
                    >
                        <TwitterIcon size={50}/>
                    </TwitterShareButton>
                </div>
                <div className="btns-container" style=
                {size<= 115 ? {  
                    left: `calc(50vw + 375px + 3rem)`
                } : (size > 115 && size <= 125) ? {  
                    left: `calc(50vw + 375px + 6rem)`
                } : {  
                    left: `calc(50vw + 375px + 9rem)`
                }}>
                    <button onClick={() => {
                        size <= 135 ? setSize(size + 5) : setSize(size)
                    }}><i className="fas fa-2x fa-plus"></i></button>
                    <button onClick={() => {
                        size >= 50 ? setSize(size-5) : setSize(size)
                    }}><i className="fas fa-2x fa-minus"></i></button>
                   
                </div>
            </div>
        </>
    )
}

export default Article;