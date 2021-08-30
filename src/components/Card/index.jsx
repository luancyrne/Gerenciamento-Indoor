import React from 'react';
import 'primereact/resources/themes/saga-blue/theme.css';
import 'primereact/resources/primereact.min.css'
import { Card } from 'primereact/card';

const CardStore = (props)=>{
    return (
        <Card
            style={{margin:'10px', cursor:'pointer'}}
            title={props.title}
            subTitle={props.subTitle}
        >{props.child}</Card>
    )
}

export default CardStore