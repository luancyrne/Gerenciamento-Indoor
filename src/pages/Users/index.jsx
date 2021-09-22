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

export class Users extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            visible: false,
            visibleEdit: false,
            visibleAdd: false,
            selection: 0,
            users: [],
            search: ''
        }
    }



    refresh = () => {
        getUsers().then(response => this.setState({ users: response })).catch(err => {
            console.log(err)
        })
    }

    componentDidMount() {
        getUsers().then(response => this.setState({ users: response })).catch(err => {
            console.log(err)
        })
    }

    handleDelete = () => {
        if (this.state.selection === 0 || this.state.selection === null) {
            toast('Selecione um usuário', { theme: 'dark', type: 'info' })
        } else {
            this.setState({ visible: !this.state.visible })
        }
    }

    handleEdit = () => {
        if (this.state.selection === 0 || this.state.selection === null) {
            toast('Selecione um usuário', { theme: 'dark', type: 'info' })
        } else {
            this.setState({ visibleEdit: !this.state.visibleEdit })
        }
    }

    handleSearch = () => {
        filter('name', this.state.search, 'users').then(response => this.setState({ users: response })).catch(err => console.log(err))
    }

    setVisible = () => {
        this.setState({ visible: !this.state.visible })
    }

    setVisibleAdd = () => {
        this.setState({ visibleAdd: !this.state.visibleAdd })
    }

    setVisibleEdit = () => {
        this.setState({ visibleEdit: !this.state.visibleEdit })
    }

    setSelection = (param) => {
        this.setState({ selection: param })
    }

    render() {
        return (
            <Layout>
                <ToastContainer />
                <div style={{ height: '60px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '10px' }}>
                    <div>
                        <Search onChange={(e) => this.setState({ search: e.target.value })} placeholder="Digite oque deseja encontrar..." style={{ width: 250 }} onSearch={this.handleSearch} enterButton />
                    </div>
                    <div>

                    </div>
                </div>
                <DataTable value={this.state.users} selectionMode="radiobutton" selection={this.state.selection} onSelectionChange={(e) => this.setState({ selection: e.value.id })} dataKey="id">
                    <Column selectionMode="single" headerStyle={{ width: '3em' }}></Column>
                    <Column field="id" header="id"></Column>
                    <Column field="name" sortable header="Nome"></Column>
                    <Column field="store" sortable header="Loja"></Column>
                    <Column field="type" header="Tipo"></Column>
                </DataTable>
                <div style={{ margin: '10px', display: 'flex', justifyContent: 'space-between' }}>
                    <Button type='primary' danger onClick={this.handleDelete}>
                        Deletar Usuário
                    </Button>
                    <Button type='primary' onClick={this.handleEdit}>
                        Editar Usuário
                    </Button>
                    <Button type='primary' onClick={() => { this.setState({ visibleAdd: !this.state.visibleAdd }) }}>
                        Adicionar Usuário
                    </Button>
                </div>
                {
                    this.state.visible ? <ModalDelUserCtx.Provider value={{ visible: this.state.visible, setVisible: this.setVisible, selection: this.state.selection, setSelection: this.setSelection, refresh: this.refresh }}>
                        <ModalDelUser />
                    </ModalDelUserCtx.Provider> : null
                }
                {
                    this.state.visibleEdit ? <ModalEditUserCtx.Provider value={{ visibleEdit: this.state.visibleEdit, setVisibleEdit: this.setVisibleEdit, refresh: this.refresh, selection: this.state.selection, setSelection: this.setSelection }}>
                        <ModalEditUser />
                    </ModalEditUserCtx.Provider> : null
                }
                {
                    this.state.visibleAdd ? <ModalAddUserCtx.Provider value={{ visibleAdd: this.state.visibleAdd, setVisibleAdd: this.setVisibleAdd, refresh: this.refresh }}>
                        <ModalAddUser />
                    </ModalAddUserCtx.Provider> : null
                }

            </Layout>
        )
    }
}
export default Users