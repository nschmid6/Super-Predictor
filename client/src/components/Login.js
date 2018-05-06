import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import axios from 'axios';

class Login extends Component {

    constructor(props){
        super(props);
        this.state = {};
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
        axios.post('http://localhost:4500/login', {
            username: this.state.username,
            password: this.state.password
        }).then(res => {
            if(res.data === '/student' || res.data === '/teacher' || res.data === '/admin'){
                this.props.history.push(res.data + "/" + this.state.username);
            }
            else{
                alert(res.data);
            }
        });
    }

    render() {
        return(
            <div className="main-content">
                <img src="/img/logo.png" alt="Super Predictor" height="200px" className="logo" />
                <div className="intro">
                    <h2>Super Predictor</h2><hr />
                    <h3>Login:</h3>
                    <form onSubmit={this.handleSubmit}>
                        Username:<br />
                        <input name="username" type="text" value={this.state.username} placeholder="Username" onChange={this.handleInputChange}  /><br />
                        Password:<br />
                        <input name="password" type="password" value={this.state.password} placeholder="Password" onChange={this.handleInputChange}  />
                        <br/><br />
                        <input type="submit" value="Submit" className="button"/>
                    </form>
                </div>
            </div>
        );
    }
}

export default Login;