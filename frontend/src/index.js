import React from 'react';
import ReactDOM from 'react-dom';
import App from './App.jsx';
import { transitions, positions, Provider as AlertProvider } from 'react-alert'
import AlertTemplate from 'react-alert-template-basic'
import {BrowserRouter as Router} from 'react-router-dom';

const options = {
    // you can also just use 'bottom center'
    position: 'top center',
    timeout: 3000,
    offset: '30px',
    // you can also just use 'scale'
    transition: 'scale'
}

ReactDOM.render(
    <Router>
        <AlertProvider template={AlertTemplate} {...options}>
            <App/> 
        </AlertProvider>
    </Router>, document.querySelector('#root')
);