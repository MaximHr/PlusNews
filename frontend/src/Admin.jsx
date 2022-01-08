import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useAlert } from 'react-alert';

const Admin = ({setIsAdmin}) => {
    const [name, setName] = useState('');
    const [pass, setPass] = useState('');
    const navigate = useNavigate('');
    const alert = useAlert();

    const submitHandler = e => {
        e.preventDefault();
        if(name.replaceAll(' ', '') === '' || pass.replaceAll(' ', '') === '') {
            console.log('red alert');
            alert.show('Попълни всички полета', {
                type: 'error'
            });
        } else {
            axios.post('/admin/logIn', ({
                name: name,
                password: pass
            })).then(res => {
                if(res.status === 200) {
                    setName('');
                    setPass('');
                    setIsAdmin(true);
                    navigate(`/znaesh/${name}`);
                }
            }).catch(err => {
                alert.show('Грешна парола или потребителско име', {
                    type: 'error'
                });
                console.error(err);
            })
        }
    }
    const updateNameHandler = e => {
        setName(e.target.value);
    }
    const updatePassHandler = e => {
        setPass(e.target.value);
    }
    return(
        <div className="Admin">
            <form onSubmit={submitHandler}>
                <h1>Welcome !</h1>
                <input 
                    type="text" 
                    placeholder='Name' 
                    className='inp'
                    value={name}
                    onChange={updateNameHandler}
                />
                <input 
                    type="password" 
                    placeholder='Password' 
                    className='inp'
                    value={pass}
                    onChange={updatePassHandler}
                />
                <input type="submit" className='btn' value='Log In'/>

            </form>
        </div>
    )
}

export default Admin;