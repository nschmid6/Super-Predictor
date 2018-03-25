import React, {Component} from 'react';
import {Link} from 'react-router-dom';

class Results extends Component {

    constructor(props){
        super(props);
        this.state = {};
    }

    render() {
        return(
            <div className="main-content">
                <img src="/img/logo.png" alt="Super Predictor" height="200px" className="logo" />
                <div className="intro">
                    <h2>Results:</h2><br />
                    <h3>Temperature:</h3><br />
                    54º<br />
                    <h3>Wind Speed:</h3><br />
                    10 mph<br />
                    <h3>Air Pressure</h3><br />
                    30 Hg<br /><br />
                    <Link to={"/start"} className="button" style={{color: 'white', textDecoration:'none'}}>Back to Start</Link>
                </div>
            </div>
        );
    }
}

export default Results;