import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import {BrowserRouter as Router,Route} from 'react-router-dom';

import StartForecast from './components/student/StartForecast';
import Login from './components/Login';
import AdminHome from './components/admin/AdminHome';
import AddUser from './components/admin/AddUser';
import TeacherHome from './components/teacher/TeacherHome';
import AddStudent from './components/teacher/AddStudent';
import AddWeather from './components/admin/AddWeather';


ReactDOM.render(
        <Router>
            <div>
                <Route exact path='/' component={Login} />
                <Route path ='/student/:username' component={StartForecast} />
                <Route path='/login' component={Login}/>
                <Route exact path='/admin/:username' component={AdminHome}/>
                <Route path='/admin/:username/add-user' component={AddUser}/>
                <Route path='/admin/:username/add-weather' component={AddWeather}/>
                <Route exact path='/teacher/:username' component={TeacherHome}/>
                <Route path='/teacher/:username/add-student' component={AddStudent}/>
            </div>
        </Router>,
        document.getElementById('root')
);
