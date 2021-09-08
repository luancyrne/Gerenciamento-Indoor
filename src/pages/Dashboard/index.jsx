import React from 'react';
import LayoutMaster from '../../components/layout';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Spin } from 'antd';
import Api from '../../services/api'
import FormData from 'form-data';

const form_data = new FormData()
form_data.append('key', 'secret')
form_data.append('query', 'SELECT * FROM lojas')

const Dashboard = () => {
    const [loading, setLoading] = React.useState(true);
    const [lojas, setLojas] = React.useState()

    React.useEffect(() => {
        Api.post('api.php', form_data).then(response => {
            if (response.data === '') {
                setLoading(false)
                return null
            } else {
                setLojas(response.data)
            }
            setLoading(false)
        })
    }, [])

    return (
        <LayoutMaster>
            <Spin spinning={loading} tip='Carregando lojas cadastradas'>
                <DataTable style={{width:'99%'}} value={lojas}>
                    <Column field="id" header="id"></Column>
                    <Column field="loja" header="Loja"></Column>
                    <Column field="slide" header="Slide"></Column>
                </DataTable>
            </Spin>
        </LayoutMaster>
    )
};

export default Dashboard;