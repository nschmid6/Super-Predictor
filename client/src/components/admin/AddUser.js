import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import axios from 'axios';

class AddUser extends Component {

    constructor(props) {
        super(props);

        this.state = {role: "Teacher"};

        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.validateForm = this.validateForm.bind(this);
        this.postData = this.postData.bind(this);
        this.teacherDropdown = this.teacherDropdown.bind(this);
        this.populateTeachers = this.populateTeachers.bind(this);
    }

    componentWillMount(){
        axios.get('http://localhost:4500/getTeachers').then(res => {
            console.log(res.data),
            this.setState({allTeachers: res.data})
        })
    }

    validateForm() {
        if(this.state.password !== this.state.confirmPassword) {
            alert("Passwords do not match.");
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

    postData(){
        if(this.validateForm()) {
            axios.post('http://localhost:4500/newUser', {
                fname: this.state.fname,
                lname: this.state.lname,
                role: this.state.role,
                username: this.state.username,
                password: this.state.password,
                teacher: this.state.teacher
            }).then(this.props.history.push('/admin/' + this.props.match.params.username));

        }
    }

    handleSubmit(event) {
        event.preventDefault();

        axios.get('http://localhost:4500/getUser/' + this.state.username).then(res=>{
                if(res.data.length >= 1){
                    alert("Username already exists");
                    return false;
                }
                else{
                    this.postData();
                }
            }
        );
    }

    populateTeachers(){
        if (this.state.allTeachers instanceof Array) {
            return this.state.allTeachers.map(function (object, i) {
                return(
                    <option value = {object.username} key={i}>{object.fname} {object.lname}</option>
                );
            })
        }
    }

    teacherDropdown(){
        if(this.state.role === 'Student'){
            return(
                <div>
                <h3>Teacher</h3><br/>
                    <select name="teacher" value={this.state.teacher} onChange={this.handleInputChange} required>
                        <option value=""></option>
                        {this.populateTeachers()}
                    </select>
                </div>
            )
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
                        <option value="Teacher">Teacher</option>
                        <option value="Student">Student</option>
                        <option value="Admin">Admin</option>
                    </select><br />
                    {this.teacherDropdown()}
                    <h3>Username</h3><br />
                    <input name="username" type="text" value={this.state.username} onChange={this.handleInputChange} required /><br />
                    <h3>Password</h3><br />
                    <input name="password" type="password" value={this.state.password} onChange={this.handleInputChange} required /><br />
                    <h3>Confirm Password</h3><br />
                    <input name="confirmPassword" type="password" value={this.state.confirmPassword} onChange={this.handleInputChange} required /><br />
                    <br /><input type="submit" value="Submit" className="button"/>
                </form>
                <br/>
                <Link to={"/admin/" + this.props.match.params.username} className="button" style={{color: 'white', textDecoration:'none'}}>Back to Home</Link>
            </div>
        );
    }
}

export default AddUser;
