import React, { useState, useEffect, useRef } from 'react';
import logo from './images/news.png';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'
import { Link } from 'react-router-dom';
import { useMediaQuery } from 'react-responsive'

const Navbar = ({setArticles, categories, category, isArticle}) => {
    const [search, setSearch] = useState('');
    const navigate = useNavigate();
    const isMobile = useMediaQuery({query: '(max-width:480px)'})
    const [hide, setHide] = useState(false);
    const searchBar = useRef('');
    const typeHandler = (e) => {
        setSearch(e.target.value);
        if(e.target.value.replaceAll(' ', '') !== '') {
            if(category === undefined) {
                searchHandler(e.target.value)
            } else {
                axios.get(`/article/get/searchByCategory/${e.target.value}/${category}`)
                .then(res => {
                    if(res.status === 200) {
                        setArticles(res.data);
                    }
                }).catch(err => {
                    console.error(err);
                })
            }
        } else {
            if(category === undefined) {
                axios.get('/article/get/recent')
                .then((res) => {
                    if(res.status === 200) {
                        setArticles(res.data);
                    }
                }).catch(err => {
                    console.log(err);
                })
            } else {
                axios.get(`/article/get/byCategory/${category}`)
                .then((res) => {
                    if(res.status === 200) {
                        setArticles(res.data);
                    }
                }).catch(err => {
                    console.log(err);
                })
            }
        }
    }
    const focusHandler = () => {
        setHide(true);
    }
    const blurHandler = () => {
        setHide(false)
    }
    const searchHandler = (value) => {
        axios.get(`/article/get/search/${value}`)
            .then(res => {
                if(res.status === 200) {
                    setArticles(res.data);
                }
            }).catch(err => {
                console.error(err);
            })
    }
    const focusAutomatically = () => {
        searchBar.current.focus();
    }
    return(
        <>
        {
            isMobile ? (
            <>
            <div className="Navbar nav-mobile">    
                <Link to='/' className="logo-container">
                    <img src={logo} alt="Лого" className='logo' />
                </Link>
                <div className='flex'>
                    <div className='flex algny'>
                        {/* <h1>Latest News</h1> */}
                        {!hide ?
                            <>
                                 <h1 className='cat'>Новини <i className="fas fa-angle-down"></i></h1>
                        <ul className='dropdown'>
                            {
                                categories.map(category => {
                                    return(
                                        <li 
                                            className='item' 
                                            key={category._id}
                                            onClick={()=> navigate(`/category/${category.name}`)}
                                        >{category.name}
                                        </li>
                                    )
                                })
                            }
                        </ul>
                            
                            </> : <></>
                        }
                       
                    </div>
                    {
                        !isArticle ? (
                            <div className='search-box' onClick={focusHandler}>
                                <button 
                                    className="btn-search"
                                    onClick={focusAutomatically}
                                >
                                    <i className="fas fa-search"></i>
                                </button>
                                <input 
                                    onBlur={blurHandler}
                                    type="text" 
                                    ref={searchBar}
                                    className='input-search' 
                                    placeholder='Търси...'
                                    value={search}
                                    onChange={typeHandler}
                                />
                            </div>
                        ) : <></>
                    }

                </div>
            </div>
                
            </>
            ) : (
            <>
            <div className="Navbar">
                <div className='flex algny'>
                    {/* <h1>Latest News</h1> */}
                    <h1 className='cat'>Новини <i className="fas fa-angle-down"></i></h1>
                    <ul className='dropdown'>
                        {
                            categories.map(category => {
                                return(
                                    <li 
                                        className='item' 
                                        key={category._id}
                                        onClick={()=> navigate(`/category/${category.name}`)}
                                    >{category.name}
                                    </li>
                                )
                            })
                        }
                    </ul>
                </div>
                <Link to='/' className="logo-container">
                    <img src={logo} alt="Лого" className='logo' />
                </Link>
                <div>
                    <input 
                        type="text" 
                        className='searchBar inp' 
                        placeholder='Търси...'
                        value={search}
                        onChange={typeHandler}
                    />
                    <button 
                        className="search"><i className="fas fa-search"></i>
                    </button>
                </div>
            </div>
            </>
            )
        }
        </>
    )
}

export default Navbar;