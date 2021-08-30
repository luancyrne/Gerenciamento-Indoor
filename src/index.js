import React from 'react';
import ReactDOM from 'react-dom';
import './styles/css/index.css';

// import Dashboard from './pages/Dashboard';
// import Login from './pages/Login';
import StoresSelect from './pages/StoresSelect';

ReactDOM.render(
  <React.StrictMode>
      {/* <Dashboard/> */}
      {/* <Login/> */}
      <StoresSelect/>
  </React.StrictMode>,
  document.getElementById('root')
);