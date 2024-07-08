import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Login from '../Pages/Login';
import Dashboard from "../Pages/Dashboard";
import Api from "../Services/api";
import { LoadingGriCtx, LoadingGri } from "../Components/LodingGri";
import Store from "../Pages/Store";
import Users from "../Pages/Users";
import List from '../Pages/List'

const RoutesController = () => {
    const [session, setSession] = React.useState(false)
    const [loading, setloading] = React.useState(true)
    let message = null
    Api.request('session.php').then((item)=>{
        setSession(item.data.authenticated)
        setloading(false)
    })
    const PrivateRoute = (props) => {
        return (<>{loading ? <LoadingGriCtx.Provider value={{ message }}><LoadingGri /></LoadingGriCtx.Provider> : <Route path={props.path} element={session ? props.element : <Navigate to="/login" />}></Route>}</>)
    }

    return (
        <BrowserRouter>
            <Routes>
                <Route path='/' element={session ? <Navigate to="/dashboard" /> : <Login />}></Route>
                <Route path='/login' element={session ? <Navigate to="/dashboard" /> : <Login />}></Route>
                <PrivateRoute path='/dashboard' element={<Dashboard />}></PrivateRoute>
                <PrivateRoute path='/stores' element={<Store />}></PrivateRoute>
                <PrivateRoute path='/users' element={<Users />}></PrivateRoute>
                <PrivateRoute path='/list' element={<List />}></PrivateRoute>
            </Routes>
        </BrowserRouter>
    )
}

export default RoutesController;