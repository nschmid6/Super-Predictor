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

    componentDidMount(){
        axios.get('http://localhost:4500/allUsers').then(res => this.setState({users: res.data}));
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
                    <Link to={"/admin/add-user"} className="button" style={{color: 'white', textDecoration:'none'}}>Add User</Link>
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
                </div>
            </div>
        );
    }
}

export default AdminHome;

