import React from 'react';
import axios from 'axios';

const List = ({categories, setCategories, category}) => {
    const deleteHandler = () => {
        axios.delete(`/category/delete/${category._id}`)
            .then(res => {
                setCategories(categories.filter(category => category._id !== res.data._id));
                console.log(res.data);
                
            }).catch(err => {
                console.error(err);
            });
    }
    return(
        <div className="list">
            <p>{category.name}</p>
            <i className="fas fa-trash-alt" onClick={deleteHandler}></i>
        </div>
    )
}

export default List;