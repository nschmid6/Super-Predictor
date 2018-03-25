import React, {Component} from 'react';
import {Link} from 'react-router-dom';

class Login extends Component {

    constructor(props){
        super(props);
        this.state = {};
        this.handleInputChange = this.handleInputChange.bind(this);
    }

    handleInputChange(event) {
        const target = event.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;

        this.setState({[name]: value});
    }

    render() {
        return(
            <div className="main-content">
                <img src="/img/logo.png" alt="Super Predictor" height="200px" className="logo" />
                <div className="intro">
                    <h2>Super Predictor</h2><hr />
                    <h3>Login:</h3>
                    <form>
                        Email:<br />
                        <input name="email" type="text" value={this.state.email} placeholder="Email" onChange={this.handleInputChange}  /><br />
                        Password:<br />
                        <input name="password" type="password" pattern="\d*" value={this.state.password} placeholder="Password" onChange={this.handleInputChange}  />
                        <br/><br />
                        <Link to={"/start"} className="button" style={{color: 'white', textDecoration:'none'}}>Login</Link>
                    </form>
                </div>
            </div>
        );
    }
}

export default Login;