import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import axios from 'axios';

class StartForecast extends Component {

    constructor(props) {
        super(props);

        this.state = {showResults: false};


        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.calculateWeather = this.calculateWeather.bind(this);
        this.showResults = this.showResults.bind(this);
        this.reset = this.reset.bind(this);
    }

    componentWillMount(){
        axios.get('http://localhost:4500/getUser/' + this.props.match.params.username).then(res =>{
            this.setState({
                fname: res.data[0].fname,
                lname: res.data[0].lname
            })
        })
    }

    calculateWeather(weatherData){
        weatherData.push({
            temp: parseInt(this.state.temperature),
            wind: parseFloat(this.state.wind),
            precip: parseFloat(this.state.precipitation)
        });

        function temperatureChange(yesterday, today) {
            return today.temp - yesterday.temp;
        }
        function windChange(yesterday, today) {
            return today.wind - yesterday.wind;
        }
        function precipChange(yesterday, today) {
            return today.precip - yesterday.precip;
        }


        let weatherLen = weatherData.length;
        let yesterday = weatherLen - 2;
        let today = weatherLen - 1;
        let yesterdayWeather = weatherData[yesterday];
        let todayWeather = weatherData[today];
        let deltaT = temperatureChange(yesterdayWeather, todayWeather);
        let deltaW = windChange(yesterdayWeather, todayWeather);
        let deltaP = precipChange(yesterdayWeather, todayWeather);
        let avgDeltaT = [0];
        let avgDeltaW = [0];
        let avgDeltaP = [0];


        for (let n=1; n<(weatherLen-1); n++) {
            if (temperatureChange(weatherData[n-1], weatherData[n]) >= (deltaT-5) && temperatureChange(weatherData[n-1], weatherData[n]) <= deltaT+5) {
                avgDeltaT.push(temperatureChange(weatherData[n], weatherData[n + 1]));
            }
            if (windChange(weatherData[n-1], weatherData[n]) >= (deltaW-5) &&  windChange(weatherData[n-1], weatherData[n]) <= (deltaW+5)) {
                avgDeltaW.push(windChange(weatherData[n], weatherData[n + 1]));
            }
            if (precipChange(weatherData[n-1], weatherData[n]) >= (deltaP-5) && precipChange(weatherData[n-1], weatherData[n]) <= (deltaP+5)) {
                avgDeltaP.push(precipChange(weatherData[n], weatherData[n+1]));
            }
       }
        let totalT = 0;
        for (let i=0; i<avgDeltaT.length; i++) {
            totalT += avgDeltaT[i];
        }
        let tomorrowTempChange = totalT / avgDeltaT.length;
        let totalW = 0;
        for (let j=0; j<avgDeltaW.length; j++) {
            totalW += avgDeltaW[j];
        }
        let tomorrowWindChange = totalW / avgDeltaW.length;
        let totalP = 0;
        for (let k=0; k<avgDeltaP.length; k++) {
            totalP += avgDeltaP[k];
        }
        let tomorrowPrecipChange = totalP / avgDeltaP.length;
        let newDay = {
            temp: Math.round(todayWeather.temp + tomorrowTempChange),
            wind: Math.round(todayWeather.wind + tomorrowWindChange,2),
            precip: Math.round(todayWeather.precip + tomorrowPrecipChange,2)
        };
        this.setState({weatherResults: newDay});
    }

    showResults(){
        if(this.state.weatherResults instanceof Object) {
            return (
                <div>
                    <h3>Temperature:</h3><br/>
                    {this.state.weatherResults.temp}º<br/>
                    <h3>Wind Speed:</h3><br/>
                    {this.state.weatherResults.wind} mph<br/>
                    <h3>Precipitation</h3><br/>
                    {this.state.weatherResults.precip} in.
                </div>
            )
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
        axios.get('http://localhost:4500/getWeather').then(res=> this.calculateWeather(res.data));
        this.setState({showResults: true});
    }

    reset(){
        this.setState({
            temperature: '',
            wind: '',
            precipitation: '',
            showResults: false
        })
    }

    render(){
        if(!this.state.showResults) {
            return (
                <div className="main-content" padding="5">
                    <img src="/img/logo.png" alt="Super Predictor" height="200px" className="logo"/><br />
                    <h4>Welcome {this.state.fname} {this.state.lname}!</h4><br />
                    <form onSubmit={this.handleSubmit}>
                        Enter your current weather conditions below!<br/><br/>
                        <h3>Temperature:</h3><br/>
                        <input name="temperature" type="text" value={this.state.temperature}
                               onChange={this.handleInputChange} required/><br/>
                        <h3>Wind Speed:</h3><br/>
                        <input name="wind" type="text" value={this.state.wind} onChange={this.handleInputChange}
                               required/><br/>
                        <h3>Precipitation (in.):</h3><br/>
                        <input name="precipitation" type="text" value={this.state.precipitation} onChange={this.handleInputChange}
                               required/><br/>
                        <br/><input type="submit" value="Submit" className="button"/>
                    </form>
                    <br/>
                    <Link to={"/login"} className="button" style={{color: 'white', textDecoration: 'none'}}>Log Out</Link>
                </div>
            );
        }
        else{
            return(
                <div className="main-content">
                    <img src="/img/logo.png" alt="Super Predictor" height="200px" className="logo" />
                    <div className="intro">
                        <h2>Results:</h2><br />
                        {this.showResults()}
                        <br /><br />
                        <Link to={"/start" + this.props.match.params.username} onClick={this.reset} className="button" style={{color: 'white', textDecoration:'none'}}>Back to Start</Link>
                    </div>
                </div>
            );
        }
    }
}

export default StartForecast;
