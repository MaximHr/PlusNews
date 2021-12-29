import React, { useState, useEffect } from 'react';
import logo from './images/news.png';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'
import { Link } from 'react-router-dom';

const Navbar = ({setArticles, categories, category}) => {
    const [search, setSearch] = useState('');
    const navigate = useNavigate();

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
    return(
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
    )
}

export default Navbar;