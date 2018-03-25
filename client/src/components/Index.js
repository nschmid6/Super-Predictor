import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import ForecastService from './ForecastService';
let config = require('../config');

class IndexItem extends Component {

    constructor(props){
        super(props);
        this.newForecast = new ForecastService();
    }

    render() {
       return(
           <div className="main-content">
               <img src="/img/logo.png" alt="Super Predictor" height="200px" className="logo" />
               <div className="intro">
                   <h2>Super Predictor</h2><hr />
                   Welcome to Super Predictor! Click below to get started.
               </div><hr />
               <div className="btn-area">
                    <Link to={"/login"} className="button" style={{color: 'white', textDecoration:'none'}}>Get Started!</Link>
               </div>
               <br />
            </div>
        );
    }
}

export default IndexItem;

