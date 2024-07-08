import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import store from './Store/authStore';
import RoutesController from './Routes/routes'

ReactDOM.render(
        <Provider store={store}>
            <RoutesController />
        </Provider>,
    document.getElementById('root')
);