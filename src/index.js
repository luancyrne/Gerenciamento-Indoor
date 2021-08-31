import React from 'react';
import ReactDOM from 'react-dom';
import './styles/css/index.css';

// import Dashboard from './pages/Dashboard';
// import Login from './pages/Login';
// import StoresSelect from './pages/StoresSelect';
import Register from './pages/Register'

ReactDOM.render(
  <React.StrictMode>
      {/* <Dashboard/> */}
      {/* <Login/> */}
      {/* <StoresSelect/> */}
      <Register/>
  </React.StrictMode>,
  document.getElementById('root')
);