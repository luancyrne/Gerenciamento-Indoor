import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Login from '../Pages/Login';
import Dashboard from "../Pages/Dashboard";
import Api from "../Services/api";
import { LoadingCnxCtx, LoadingCnx } from "../Components/LodingCnx";
import Store from "../Pages/Store";
import Users from "../Pages/Users";

const RoutesController = () => {
    const [session, setSession] = React.useState(false)
    const [loading, setloading] = React.useState(true)
    let message = null
    Api.request('session.php').then((item)=>{
        setSession(item.data.authenticated)
        setloading(false)
    })
    const PrivateRoute = (props) => {
        return (<>{loading ? <LoadingCnxCtx.Provider value={{ message }}><LoadingCnx /></LoadingCnxCtx.Provider> : <Route path={props.path} element={session ? props.element : <Navigate to="/login" />}></Route>}</>)
    }

    return (
        <BrowserRouter>
            <Routes>
                <Route path='/' element={session ? <Navigate to="/dashboard" /> : <Login />}></Route>
                <Route path='/login' element={session ? <Navigate to="/dashboard" /> : <Login />}></Route>
                <PrivateRoute path='/dashboard' element={<Dashboard />}></PrivateRoute>
                <PrivateRoute path='/stores' element={<Store />}></PrivateRoute>
                <PrivateRoute path='/users' element={<Users />}></PrivateRoute>
            </Routes>
        </BrowserRouter>
    )
}

export default RoutesController;