import React from 'react';
import LayoutMaster from '../../components/layout';
import { Button, Spin } from 'antd';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { useNavigate } from 'react-router';
import Api from '../../services/api';
import FormData from 'form-data';
import ApiAgent from '../../services/apiAgent';
import 'antd/dist/antd.css';

const form_data = new FormData()
form_data.append('key', 'secret')
form_data.append('query', 'SELECT * FROM usuarios')

const Users = () => {
    const navigate = useNavigate()
    const [loading, setLoading] = React.useState(true);
    const [users, setUsers] = React.useState()
    const [selectionData, setSelectionData] = React.useState(null)

    React.useEffect(() => {
        Api.post('api.php', form_data).then(response => {
            if (response.data === '') {
                setLoading(false)
                return null
            } else {
                setUsers(response.data)
            }
            setLoading(false)
        })
    }, [])

    const refresh = () => {
        Api.post('api.php', form_data).then(response => {
            if (response.data === '') {
                setLoading(false)
                return null
            } else {
                setUsers(response.data)
            }
            setLoading(false)
        })
    }

    const handleDelete = () => {
        ApiAgent(`${"DELETE FROM usuarios WHERE id ="}'${selectionData.id}'`)
        refresh()
    }

    return (
        <LayoutMaster>
            <div style={{ height: 50, width: '100%', display: 'flex', justifyContent: 'space-between' }}>
                <Button onClick={handleDelete} danger>
                    Deletar Usuário
                </Button>
                <Button onClick={() => { navigate('/register') }}>
                    Adicionar
                </Button>
            </div>
            <Spin spinning={loading} tip='Carregando usuários'>
                <DataTable value={users} selectionMode="radiobutton" selection={selectionData} onSelectionChange={(e) => { setSelectionData(e.value) }} dataKey="id">
                    <Column selectionMode="single" headerStyle={{ width: '3em' }}></Column>
                    <Column field="id" header="id"></Column>
                    <Column field="nome" header="Nome"></Column>
                    <Column field="loja" header="Lojas"></Column>
                </DataTable>
            </Spin>
        </LayoutMaster>
    )
}

export default Users;