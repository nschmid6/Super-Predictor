import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import TableRow from './TableRow';
import axios from 'axios';


class TeacherHome extends Component {

    constructor(props){
        super(props);
        this.state = {};

        this.tableRow = this.tableRow.bind(this);
    }

    componentDidMount(){
        axios.get('http://localhost:4500/allStudents').then(res => this.setState({users: res.data}));
    }


    tableRow() {
        if (this.state.users instanceof Array) {
            return this.state.users.map(function (object, i) {
                return(
                    <TableRow obj={object} key={i}/>
                );
            })
        }
    }

    render() {
        return(
            <div className="main-content">
                <img src="/img/logo.png" alt="Super Predictor" height="200px" className="logo" />
                <div className="intro">
                    <h2>Super Predictor</h2><hr />
                    <h3>Teacher Home</h3><br />
                    <Link to={"/teacher/add-student"} className="button" style={{color: 'white', textDecoration:'none'}}>Add Student</Link>
                    <br /><br />
                    <table className="user-table">
                        <thead>
                            <td className="user-table-cell">First Name</td>
                            <td className="user-table-cell">Last Name</td>
                            <td className="user-table-cell">Username</td>
                            <td className="user-table-cell">Action</td>
                        </thead>
                        <tbody>
                            {this.tableRow()}
                        </tbody>
                    </table>
                </div>
            </div>
        );
    }
}

export default TeacherHome;

