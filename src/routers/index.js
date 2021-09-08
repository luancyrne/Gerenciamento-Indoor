import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Login from '../pages/Login';
import StoresSelect from '../pages/StoresSelect';
import Dashboard from '../pages/Dashboard';
import Register from '../pages/Register';
import Users from '../pages/Users/index';
import auth from '../services/tempAuth';

const SecurityRoutes = (props) => {

    return (
        <Route path={props.path} element={auth.login ? props.element : <Login />}></Route>
    )
}

const RoutersPage = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path='/' element={auth.login ? <Dashboard /> : <Login />}></Route>
                <Route path='/login' element={auth.login ? <Dashboard /> : <Login />}></Route>
                <SecurityRoutes path='/dashboard' element={<Dashboard />}></SecurityRoutes>
                <SecurityRoutes path='/storesselect' element={<StoresSelect />}></SecurityRoutes>
                <SecurityRoutes path='/register' element={<Register />}></SecurityRoutes>
                <SecurityRoutes path='/users' element={<Users />}></SecurityRoutes>
            </Routes>
        </BrowserRouter>
    )
}

export default RoutersPage;