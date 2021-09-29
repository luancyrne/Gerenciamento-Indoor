import React from 'react';
import Layout from '../../Components/Layout';
import 'primereact/resources/themes/saga-blue/theme.css';
import 'primereact/resources/primereact.min.css';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { getStores } from '../../Services/controller/store/getStore';
import { Button, Input, Checkbox } from 'antd';
import { ToastContainer, toast } from 'react-toastify';
import { ModalDelStore, ModalDelStoreCtx } from '../../Components/ModalsStore/ModalDelStore';
import { ModalEditStore, ModalEditStoreCtx } from '../../Components/ModalsStore/ModalEditStore';
import { ModelAddStoreCtx, ModalAddStore } from '../../Components/ModalsStore/ModelAddStore';
import filter from '../../Services/filter';

const { Search } = Input

const Store = () => {
    const [stores, setStores] = React.useState([]);
    const [selection, setSelection] = React.useState(0);
    const [visible, setVisible] = React.useState(false)
    const [visibleEdit, setVisibleEdit] = React.useState(false);
    const [visibleAdd, setVisibleAdd] = React.useState(false);
    const [search, setSearch] = React.useState('');
    const [dataInformation, setDataInformation] = React.useState('');

    const refresh = () => {
        getStores().then(response => setStores(response)).catch(err => console.log(err))
    }

    React.useEffect(() => {
        getStores().then(response => setStores(response)).catch(err => console.log(err))
    }, [])

    const handleDelete = () => {
        if (selection) {
            setVisible(true)
        } else {
            toast('Selecione uma loja', { theme: 'dark', type: 'info' })
        }
    }

    const handleEdit = () => {
        if (selection === 0 || selection === null) {
            toast('Selecione uma loja', { theme: 'dark', type: 'info' })
        } else {
            setVisibleEdit(true)
        }
    }

    const handleSearch = () => {
        filter('name', search, 'stores').then(response => setStores(response)).catch(err => console.log(err))
    }

    const checkboxStore = (rowData) => {
        return <Checkbox onChange={(e) => {
            setSelection(e.target.value)
            setDataInformation(rowData.name)
        }} checked={selection === rowData.id ? true : false} value={rowData.id} />
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
            <DataTable selectionMode="radiobutton" value={stores} dataKey="id">
                <Column headerStyle={{ width: '3em' }} body={checkboxStore}></Column>
                <Column field="id" header="id"></Column>
                <Column field="name" sortable header="Loja"></Column>
            </DataTable>
            <div style={{ margin: '10px', display: 'flex', justifyContent: 'space-between' }}>
                <Button type='primary' danger onClick={handleDelete} >
                    Deletar Loja
                </Button>
                <Button type='primary' onClick={handleEdit} >
                    Editar Loja
                </Button>
                <Button type='primary' onClick={() => setVisibleAdd(true)} >
                    Adicionar Loja
                </Button>
            </div>
            {
                visible ? (<ModalDelStoreCtx.Provider value={{ selection, visible, setVisible, setSelection, refresh }}>
                    <ModalDelStore />
                </ModalDelStoreCtx.Provider>) : null
            }
            {
                visibleEdit ? (<ModalEditStoreCtx.Provider value={{ visibleEdit, setVisibleEdit, selection, dataInformation, refresh, setSelection }}>
                    <ModalEditStore />
                </ModalEditStoreCtx.Provider>) : null
            }
            {
                visibleAdd ? (<ModelAddStoreCtx.Provider value={{ visibleAdd, setVisibleAdd, refresh }}>
                    <ModalAddStore />
                </ModelAddStoreCtx.Provider>) : null
            }

        </Layout>

    )
}

export default Store;