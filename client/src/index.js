import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import {BrowserRouter as Router,Route} from 'react-router-dom';

import Index from './components/Index';
import StartForecast from './components/StartForecast';
import Login from './components/Login';
import Results from './components/Results';


ReactDOM.render(
        <Router>
            <div>
                <Route exact path='/' component={Index} />
                <Route path ='/start' component={StartForecast} />
                <Route path='/index' component={Index}/>
                <Route path='/login' component={Login}/>
                <Route path='/results' component={Results}/>
            </div>
        </Router>,
        document.getElementById('root')
);
