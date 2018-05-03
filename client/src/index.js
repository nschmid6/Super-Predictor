import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import {BrowserRouter as Router,Route} from 'react-router-dom';

import Index from './components/Index';
import StartForecast from './components/StartForecast';
import Login from './components/Login';
import Results from './components/Results';
import AdminHome from './components/admin/AdminHome';
import AddUser from './components/admin/AddUser';
import TeacherHome from './components/teacher/TeacherHome';
import AddStudent from './components/teacher/AddStudent';


ReactDOM.render(
        <Router>
            <div>
                <Route exact path='/' component={Index} />
                <Route path ='/start' component={StartForecast} />
                <Route path='/index' component={Index}/>
                <Route path='/login' component={Login}/>
                <Route path='/results' component={Results}/>
                <Route exact path='/admin' component={AdminHome}/>
                <Route path='/admin/add-user' component={AddUser}/>
                <Route exact path='/teacher' component={TeacherHome}/>
                <Route path='/teacher/add-student' component={AddStudent}/>
            </div>
        </Router>,
        document.getElementById('root')
);
