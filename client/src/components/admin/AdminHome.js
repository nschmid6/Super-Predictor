import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import axios from 'axios';
import TableRow from './TableRow';

class AdminHome extends Component {

    constructor(props){
        super(props);
        this.state = {};

        this.tableRow = this.tableRow.bind(this);
    }

    componentWillMount(){
        axios.get('http://localhost:4500/allUsers').then(res => this.setState({users: res.data}));
        axios.get('http://localhost:4500/getUser/' + this.props.match.params.username).then(res =>{
            this.setState({
                fname: res.data[0].fname,
                lname: res.data[0].lname
            })
        })
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
                    <h3>Admin Console</h3><br />
                    <h4>Welcome {this.state.fname} {this.state.lname}!</h4><br />
                    <Link to={"/admin/" + this.props.match.params.username + "/add-weather"} className="button" style={{color: 'white', textDecoration:'none'}}>Add Weather Data</Link><br /><br />
                    <Link to={"/admin/" + this.props.match.params.username + "/add-user"} className="button" style={{color: 'white', textDecoration:'none'}}>Add User</Link>
                    <br /><br />
                    <table className="user-table">
                        <thead>
                            <tr>
                                <th className="user-table-cell">First Name</th>
                                <th className="user-table-cell">Last Name</th>
                                <th className="user-table-cell">Username</th>
                                <th className="user-table-cell">Role</th>
                                <th className="user-table-cell">Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {this.tableRow()}
                        </tbody>
                    </table>
                    <br />
                    <Link to={"/login"} className="button" style={{color: 'white', textDecoration:'none'}}>Log Out</Link>
                </div>
            </div>
        );
    }
}

export default AdminHome;

