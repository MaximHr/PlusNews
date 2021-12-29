import React from 'react';
import Moment from 'react-moment';
import { useNavigate } from 'react-router';

const Card = ({title, author, category, url, date, article, type, setPage, setEditableArticle}) => {
    const navigate = useNavigate();

    const handleArticle = (article) => {
        if(type === 1 && article._id != undefined) {
            navigate(`/article/${article._id}`);
        }
        if(type === 2) {
            setPage(2);
            setEditableArticle(article)
        }
    }
    return(
        <div className="card" onClick={() => handleArticle(article)}>
            <div className='together'>
                <img 
                    className='img' 
                    src={url} 
                    alt="Основна Снимка" 
                />
                <button className='category'>{category}</button>
            </div>
            <h1 className='card_title'>{title}</h1>
            <div style={{
                height: '25px'
            }}></div>
            <p className='subtext'>
                <span className='author'><i className="fas fa-user"></i>{author}</span>
                <span className='date'>
                    <i className="fas fa-clock"></i>
                    <Moment format='DD/MM/YYYY'>{date}</Moment>
                </span>
                {
                article.views !== undefined && type === 2 ?<>
                    <p className='views'>{article.views} <i className="far fa-eye"></i></p>
                </> 
                    : <></>
            }
            </p>
          
        </div>
    )
}

export default Card;