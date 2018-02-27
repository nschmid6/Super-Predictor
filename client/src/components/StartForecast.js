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
        let bannerPattern = new RegExp("00[0-9]{7}");

        if(!bannerPattern.test(this.state.banner)){
            alert("Please enter a valid banner ID.");
            return false;
        }
        else{
            return true;
        }
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
            this.props.history.push('/index');
        }
    }

    render(){
        return(
                <div className="main-content" padding="5">
                    <form onSubmit={this.handleSubmit}>
                            (This will change but is a basic example)<br />
                            Enter your current weather conditions below!<br />
                            Banner ID:
                                <input name="banner" type="text" value={this.state.banner} onChange={this.handleInputChange} className="form-control" required /><br />
                        <input type="submit" value="Submit" className="btn btn-primary"/>
                    </form>
                    <br/>
					<Link to={"/index"} className="btn btn-primary">Back to Home</Link>
				</div>
        );
    }
}

export default StartForecast;
