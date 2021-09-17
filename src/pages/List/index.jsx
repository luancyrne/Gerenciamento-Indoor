import React from 'react';
import Layout from '../../Components/Layout/index';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { getLists } from '../../Services/controller/lists/getLists';
import { ModalDelListCtx, ModalDelList } from '../../Components/ModalsList/ModalDelList';
import { ModalEditListCtx, ModalEditList } from '../../Components/ModalsList/ModalEditList';
import { ModalAddListCtx, ModalAddList } from '../../Components/ModalsList/ModalAddList';
import { Button, Input, Select } from 'antd';
import { toast, ToastContainer } from 'react-toastify';
import filter from '../../Services/filter'

const { Search } = Input
const { Option } = Select

const List = () => {

    const [list, setList] = React.useState([]);
    const [selection, setSelection] = React.useState(0);
    const [visible, setVisible] = React.useState(false)
    const [visibleEdit, setVisibleEdit] = React.useState(false)
    const [visibleAdd, setVisibleAdd] = React.useState(false)
    const [searchParam, setSearchParam] = React.useState('');
    const [filterParam, setFilterParam] = React.useState('');

    const refresh = () => {
        getLists().then(response => setList(response)).catch(err => {
            console.log(err)
        })
    }

    React.useEffect(() => {
        getLists().then(response => setList(response)).catch(err => {
            console.log(err)
        })
    }, [])

    const handleDelete = () => {
        setVisible(true)
    }

    const handleEdit = () => {
        if (selection === 0 || selection === null) {
            toast('Selecione uma lista', { theme: 'dark', type: 'info' })
        } else {
            setVisibleEdit(true)
        }
    }

    const handleSearch = () => {
        filter(filterParam, searchParam, 'list').then(response => {
            setList(response)
        }).catch(err => {
            console.log(err)
        })
    }

    return (
        <Layout>
            <ToastContainer />
            <div style={{ height: '60px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '10px' }}>
                <div>
                    <Search placeholder="Digite oque deseja encontrar..." style={{ width: 250 }} onChange={(e) => { setSearchParam(e.target.value) }} onSearch={handleSearch} enterButton />
                    <Select defaultValue="name" style={{ width: 120 }} onSelect={(e) => { setFilterParam(e) }}>
                        <Option value="name">Nome</Option>
                        {
                            localStorage.getItem('type') === 'admin' ? <Option value="store">Loja</Option> : null
                        }
                    </Select>
                </div>
                <div>

                </div>
            </div>
            <DataTable value={list} selectionMode="radiobutton" selection={selection} onSelectionChange={(e) => setSelection(e.value.id)} dataKey="id">
                <Column selectionMode="single" headerStyle={{ width: '3em' }}></Column>
                <Column field="id" header="id"></Column>
                <Column field="name" sortable header="Lista"></Column>
                <Column field="store" sortable header="Loja"></Column>
            </DataTable>
            <div style={{ margin: '10px', display: 'flex', justifyContent: 'space-between' }}>
                <Button type='primary' danger onClick={handleDelete}>
                    Deletar Lista
                </Button>
                <Button type='primary' onClick={handleEdit}>
                    Editar Lista
                </Button>
                <Button type='primary' onClick={() => { setVisibleAdd(true) }}>
                    Adicionar Lista
                </Button>
            </div>
            <ModalDelListCtx.Provider value={{ visible, setVisible, selection, refresh, setSelection }}>
                <ModalDelList />
            </ModalDelListCtx.Provider>
            <ModalEditListCtx.Provider value={{ visibleEdit, setVisibleEdit, selection, refresh, setSelection }}>
                <ModalEditList />
            </ModalEditListCtx.Provider>
            <ModalAddListCtx.Provider value={{ visibleAdd, setVisibleAdd, refresh }}>
                <ModalAddList />
            </ModalAddListCtx.Provider>
        </Layout>
    )
}

export default List;