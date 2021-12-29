import React, { useEffect, useRef, useState } from 'react';
import axios from 'axios';
import List from './List';

const CreateCategory = ({setPage}) => {
    const [categories, setCategories] = useState([]);
    const value = useRef('');

    useEffect(() => {
        axios.get('/category/get')
            .then(res => {
                if(res.status === 200) {
                    setCategories(res.data)
                }
            }).catch(err => console.error(err));
    }, []);
    const addHandler = (name) => {
        axios.post('/category/post', {
            name: name
        }).then(res => {
            if(res.status === 200) {
                const newCategories = [...categories];
                newCategories.push(res.data);
                setCategories(newCategories);
                value.current.value = '';
            }
        }).catch(err => console.error(err));
    }

    return( 
        <div className="createCategory">
            <button 
            className='btn m l' 
            onClick={() => setPage(0)}
        >Върни се</button>
            <h1>Твоите Категории: </h1>

            <div className="container">
                <div className='together'>
                    <input 
                        className='inp' 
                        type="text" 
                        ref={value}
                        placeholder='Категория' 
                    />
                    <button className='btn' onClick={() => addHandler(value.current.value)}>Добави</button>
                </div>
                {
                    categories.map(category => {
                        return (
                            <List key={category._id} categories={categories} setCategories={setCategories} category={category}/>
                        )
                    })
                }
            </div>
        </div>
    )
}

export default CreateCategory;