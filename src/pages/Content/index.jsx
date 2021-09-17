import React from 'react';
import Layout from '../../Components/Layout/index';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';

const Content = () => {


    return (
        <Layout>
            <DataTable selectionMode="radiobutton"  dataKey="id">
                <Column selectionMode="single" headerStyle={{ width: '3em' }}></Column>
                <Column field="id" header="id"></Column>
                <Column field="name" sortable header="Tela"></Column>
                <Column field="link" header="Link final"></Column>
            </DataTable>
        </Layout>
    )

}

export default Content