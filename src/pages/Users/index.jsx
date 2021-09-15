import React from 'react';
import Layout from '../../Components/Layout/index';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { getUsers } from '../../Services/controller/users/getUser';
import { Button, Input } from 'antd';
import { ModalDelUserCtx, ModalDelUser } from '../../Components/ModalsUser/ModalDelUser';
import { ModalEditUserCtx, ModalEditUser } from '../../Components/ModalsUser/ModalEditUser';
import { ModalAddUserCtx, ModalAddUser } from '../../Components/ModalsUser/ModelAddUser';
import { toast, ToastContainer } from 'react-toastify';
import filter from '../../Services/filter';

const { Search } = Input

const Users = () => {
    const [visible, setVisible] = React.useState(false)
    const [visibleEdit, setVisibleEdit] = React.useState(false)
    const [visibleAdd, setVisibleAdd] = React.useState(false)
    const [selection, setSelection] = React.useState(0);
    const [users, setUsers] = React.useState([]);
    const [search, setSearch] = React.useState('');

    const refresh = () => {
        getUsers().then(response => setUsers(response)).catch(err => {
            console.log(err)
        })
    }

    React.useEffect(() => {
        getUsers().then(response => setUsers(response)).catch(err => {
            console.log(err)
        })
    }, [])


    const handleDelete = () => {
        if (selection === 0 || selection === null) {
            toast('Selecione um usuário', { theme: 'dark', type: 'info' })
        } else {
            setVisible(true)
        }

    }

    const handleEdit = () => {
        if (selection === 0 || selection === null) {
            toast('Selecione um usuário', { theme: 'dark', type: 'info' })
        } else {
            setVisibleEdit(true)
        }

    }

    const handleSearch = () => {
        filter('name', search, 'users').then(response => setUsers(response)).catch(err => console.log(err))
    }

    return (
        <Layout>
            <ToastContainer />
            <div style={{ height: '60px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '10px' }}>
                <div>
                    <Search onChange={(e) => setSearch(e.target.value)} placeholder="Digite oque deseja encontrar..." style={{ width: 250 }} onSearch={handleSearch} enterButton />
                </div>
                <div>

                </div>
            </div>
            <DataTable value={users} selectionMode="radiobutton" selection={selection} onSelectionChange={(e) => setSelection(e.value.id)} dataKey="id">
                <Column selectionMode="single" headerStyle={{ width: '3em' }}></Column>
                <Column field="id" header="id"></Column>
                <Column field="name" sortable header="Nome"></Column>
                <Column field="store" sortable header="Loja"></Column>
                <Column field="type" header="Tipo"></Column>
            </DataTable>
            <div style={{ margin: '10px', display: 'flex', justifyContent: 'space-between' }}>
                <Button type='primary' danger onClick={handleDelete}>
                    Deletar Usuário
                </Button>
                <Button type='primary' onClick={handleEdit}>
                    Editar Usuário
                </Button>
                <Button type='primary' onClick={()=>{setVisibleAdd(true)}}>
                    Adicionar Usuário
                </Button>
            </div>
            <ModalDelUserCtx.Provider value={{ visible, setVisible, selection, setSelection, refresh }}>
                <ModalDelUser />
            </ModalDelUserCtx.Provider>
            <ModalEditUserCtx.Provider value={{ visibleEdit, setVisibleEdit, refresh, selection, setSelection }}>
                <ModalEditUser />
            </ModalEditUserCtx.Provider>
            <ModalAddUserCtx.Provider value={{ visibleAdd, setVisibleAdd, refresh }}>
                <ModalAddUser />
            </ModalAddUserCtx.Provider>
        </Layout>
    )
}

export default Users