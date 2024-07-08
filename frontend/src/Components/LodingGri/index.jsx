import React from "react";
import '../../Styles/loading.css';

export const LoadingGriCtx = React.createContext();

export const LoadingGri = () => {

    const { message} = React.useContext(LoadingGriCtx)

    return (
        <div className='loading'>
            <label>GRI</label>
            <label className='Footer' style={{ marginTop: '50px' }}>{message}</label>
        </div>
    )
}

