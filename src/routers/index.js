import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Login from '../pages/Login';
import StoresSelect from '../pages/StoresSelect';
import Dashboard from '../pages/Dashboard';
import Register from '../pages/Register';

const authUser = true
const SecurityRoutes = (props) => {

    return (
        <Route path={props.path} element={authUser ? props.element : <Login />}></Route>
    )
}

const RoutersPage = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path='/' element={authUser ? <Dashboard /> : <Login />}></Route>
                <Route path='/login' element={authUser ? <Dashboard /> : <Login />}></Route>
                <SecurityRoutes path='/dashboard' element={<Dashboard />}></SecurityRoutes>
                <SecurityRoutes path='/storesselect' element={<StoresSelect />}></SecurityRoutes>
                <SecurityRoutes path='/Register' element={<Register />}></SecurityRoutes>
            </Routes>
        </BrowserRouter>
    )
}

export default RoutersPage;