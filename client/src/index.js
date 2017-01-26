import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import './semantic-ui/dist/semantic.min.css';
import './index.css';
import {Router, Route, browserHistory} from 'react-router';
import JeeyReader from './modules/jeey/jeey-reader.js';

ReactDOM.render((
    <Router history={browserHistory}>
        <Route path="/" component={App}/>
        <Route path="/:id" component={JeeyReader}/>
    </Router>
), document.getElementById('root'));