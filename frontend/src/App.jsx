import React, { useState, useEffect } from 'react';
import Home from './Home';
import './style.scss';
import { Routes, Route, Navigate } from 'react-router-dom';
import Admin from './Admin';
import Main from './Main';
import Category from './Category';
import Article from './Article';
import axios from 'axios';

const App = () => {
    const [isAdmin, setIsAdmin] = useState(false);
    const [categories, setCategories] = useState([]);

    useEffect(() => {
        axios.get('/category/get')
            .then(res => {
                if(res.status === 200) {
                    setCategories(res.data)
                }
            }).catch(err => console.error(err));
    });

    return(
        <div className="app">
            <Routes>
                <Route path="/" element={<Home categories={categories} />} />
                <Route path="/category/:category" element={<Category categories={categories}/>} />
                <Route path='/article/:id' exact={true} element={<Article />}/>
                <Route path='/admin' element={<Admin setIsAdmin={setIsAdmin}/>}/>
                <Route path='/admin/:name' element={isAdmin ? <Main /> : <Navigate to='/'/>}/>
            </Routes>
        </div>
    )
}

export default App;