import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import {BrowserRouter as Router,Route} from 'react-router-dom';

import Index from './components/Index';
import StartForecast from './components/StartForecast';


ReactDOM.render(
        <Router>
            <div>
                <Route exact path='/' component={Index} />
                <Route path ='/start' component={StartForecast} />
                <Route path='/index' component={Index}/>
            </div>
        </Router>,
        document.getElementById('root')
);
