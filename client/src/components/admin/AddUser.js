import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import axios from 'axios';

class AddUser extends Component {

    constructor(props) {
        super(props);

        this.state = {role: "Student"};

        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.validateForm = this.validateForm.bind(this);
    }

    validateForm() { //this is leftover from capstone but may be useful for form entry
        if(this.state.password !== this.state.confirmPassword) {
            alert("Passwords do not match.")
            return false;
        }
        else {
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
            axios.post('http://localhost:4500/newUser', {
                fname: this.state.fname,
                lname: this.state.lname,
                role: this.state.role,
                username: this.state.username,
                password: this.state.password
            }).then(this.props.history.push('/admin'));

        }
    }

    render(){
        return(
            <div className="main-content" padding="5">
                <img src="/img/logo.png" alt="Super Predictor" height="200px" className="logo" />
                <form onSubmit={this.handleSubmit}>
                    <h2>Add a User</h2><br />
                    <h3>First Name:</h3><br />
                    <input name="fname" type="text" value={this.state.fname} onChange={this.handleInputChange} required /><br />
                    <h3>Last Name</h3><br />
                    <input name="lname" type="text" value={this.state.lname} onChange={this.handleInputChange} required /><br />
                    <h3>Role</h3><br />
                    <select name="role" value={this.state.role} onChange={this.handleInputChange} required>
                        <option value="Student">Student</option>
                        <option value="Teacher">Teacher</option>
                        <option value="Admin">Admin</option>
                    </select><br />
                    <h3>Username</h3><br />
                    <input name="username" type="text" value={this.state.username} onChange={this.handleInputChange} required /><br />
                    <h3>Password</h3><br />
                    <input name="password" type="password" value={this.state.password} onChange={this.handleInputChange} required /><br />
                    <h3>Confirm Password</h3><br />
                    <input name="confirmPassword" type="password" value={this.state.confirmPassword} onChange={this.handleInputChange} required /><br />
                    <br /><input type="submit" value="Submit" className="button"/>
                </form>
                <br/>
                <Link to={"/admin"} className="button" style={{color: 'white', textDecoration:'none'}}>Back to Home</Link>
            </div>
        );
    }
}

export default AddUser;
