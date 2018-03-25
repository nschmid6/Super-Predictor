import React, {Component} from 'react';
import ForecastService from './ForecastService';
import {Link} from 'react-router-dom';

class StartForecast extends Component {

    constructor(props) {
        super(props);

        this.state = {};

        this.newForecast = new ForecastService();

        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.validateForm = this.validateForm.bind(this);
    }

    validateForm() { //this is leftover from capstone but may be useful for form entry
        return true;
    }

    handleInputChange(event) {
        const target = event.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;

        this.setState({[name]: value});
    }

    handleSubmit(event) {
        event.preventDefault();
        if(this.validateForm()) {
            this.newForecast.sendData(this.state);
            this.props.history.push('/results');
        }
    }

    render(){
        return(
                <div className="main-content" padding="5">
                    <img src="/img/logo.png" alt="Super Predictor" height="200px" className="logo" />
                    <form onSubmit={this.handleSubmit}>
                        Enter your current weather conditions below!<br /><br />
                        <h3>Temperature:</h3><br />
                        <input name="temperature" type="text" value={this.state.temperature} onChange={this.handleInputChange} required /><br />
                        <h3>Wind Speed:</h3><br />
                        <input name="wind" type="text" value={this.state.wind} onChange={this.handleInputChange} required /><br />
                        <h3>Air Pressure:</h3><br />
                        <input name="pressure" type="text" value={this.state.pressure} onChange={this.handleInputChange} required /><br />
                        <br /><input type="submit" value="Submit" className="button"/>
                    </form>
                    <br/>
					<Link to={"/index"} className="button" style={{color: 'white', textDecoration:'none'}}>Back to Home</Link>
				</div>
        );
    }
}

export default StartForecast;
