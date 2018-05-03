import React, {Component} from 'react';
import axios from 'axios';

class TableRow extends Component {

    constructor(props) {
        super(props);
        this.handleDelete = this.handleDelete.bind(this);
    }

    handleDelete(username) {
        let del = window.confirm("Are you sure you want to delete this user?");
        if (del) {
            axios.get('http://localhost:4500/deleteUser/' + this.props.obj.username);
        }
        window.location.reload();
    }

    render() {
        return (
            <tr>
                <td className="user-table-cell">{this.props.obj.fname}</td>
                <td className="user-table-cell">{this.props.obj.lname}</td>
                <td className="user-table-cell">{this.props.obj.username}</td>
                <td className="user-table-cell">
                    <button onClick={this.handleDelete}>Delete</button>
                </td>
            </tr>
        )
    }
}

export default TableRow;