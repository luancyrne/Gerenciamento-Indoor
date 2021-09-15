import React from "react";
import '../../Styles/loading.css';
import whiteLogo from '../../Assets/img/whiteLogo.png';

export const LoadingCnxCtx = React.createContext();

export const LoadingCnx = () => {

    const { message} = React.useContext(LoadingCnxCtx)

    return (
        <div className='loading'>
            <img src={whiteLogo} alt="CNX Telecom - Você sempre conectado!" />
            <label className='Footer' style={{ marginTop: '50px' }}>{message}</label>
        </div>
    )
}

