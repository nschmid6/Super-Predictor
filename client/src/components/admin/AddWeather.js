import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import axios from 'axios';

class AddWeather extends Component {

    constructor(props) {
        super(props);

        this.state = {role: "Student"};

        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleInputChange(event) {
        const target = event.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;

        this.setState({[name]: value});
    }


    handleSubmit(event) {
        event.preventDefault();
        axios.post('http://localhost:4500/addWeather', {
            temp: this.state.temp,
            wind: this.state.wind,
            precip: this.state.precip,
        }).then(this.props.history.push('/admin/' + this.props.match.params.username));
    }

    render(){
        return(
            <div className="main-content" padding="5">
                <img src="/img/logo.png" alt="Super Predictor" height="200px" className="logo" />
                <form onSubmit={this.handleSubmit}>
                    <h2>Add Weather Data</h2><br />
                    <h3>Temperature (º)</h3><br />
                    <input name="temp" type="text" value={this.state.temp} onChange={this.handleInputChange} required /><br />
                    <h3>Wind (mph)</h3><br />
                    <input name="wind" type="text" value={this.state.wind} onChange={this.handleInputChange} required /><br />
                    <h3>Precipitation (in.)</h3><br />
                    <input name="precip" type="text" value={this.state.precip} onChange={this.handleInputChange} required /><br />
                    <br /><input type="submit" value="Submit" className="button"/>
                </form>
                <br/>
                <Link to={"/admin/" + this.props.match.params.username} className="button" style={{color: 'white', textDecoration:'none'}}>Back to Home</Link>
            </div>
        );
    }
}

export default AddWeather;
