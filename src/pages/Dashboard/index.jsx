import React from 'react';
import Layout from '../../Components/Layout/index';
import { getScreens } from '../../Services/controller/screens/getScreens';
import { ToastContainer, toast } from 'react-toastify';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import 'primereact/resources/themes/saga-blue/theme.css'
import 'primereact/resources/primereact.min.css';
import { Button, Input, Select } from 'antd';
import { ModalDelScreen, ModalDelScreenCtx } from '../../Components/ModalsScreen/ModelDelScreen';
import { ModalAddScreen, ModalAddScreenCtx } from '../../Components/ModalsScreen/ModalAddScreen/index';
import { ModalEditScreen, ModalEditScreenCtx } from '../../Components/ModalsScreen/ModalEditScreen/index';
import filter from '../../Services/filter';
import 'primeicons/primeicons.css'

const { Search } = Input;
const { Option } = Select;


const Dashboard = () => {
    const [screens, setScreens] = React.useState([]);
    const [selection, setSelection] = React.useState(0);
    const [visible, setVisible] = React.useState(false);
    const [visibleAdd, setVisibleAdd] = React.useState(false);
    const [visibleEdit, setVisibleEdit] = React.useState(false);
    const [searchParam, setSearchParam] = React.useState('');
    const [searchType, setSearchType] = React.useState('name');

    const refresh = () => {
        getScreens().then(screens => setScreens(screens)).catch(err => {
            toast('Erro ao acessar telas', { theme: 'dark', type: 'warning' })
        })
    }

    React.useEffect(() => {
        refresh()
    }, [])

    const handleDelete = () => {
        if (selection) {
            setVisible(true)
        } else {
            toast('Selecione uma tela', { theme: 'dark', type: 'info' })
        }
    }

    const handleEdit = () => {
        if (selection) {
            setVisibleEdit(true)
        } else {
            toast('Selecione uma tela', { theme: 'dark', type: 'info' })
        }
    }

    const handleSearch = () => {
        if (searchParam === '') {
            refresh();
        } else {
            filter(searchType, searchParam, 'screens').then(response => {
                setScreens(response)
            }).catch(err => {
                console.log(err)
            })
        }
    }
   



    return (
        <Layout>
            <ToastContainer />
            <div style={{ height: '60px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '10px' }}>
                <div>
                    <Search placeholder="Digite oque deseja encontrar..." style={{ width: 250 }} onChange={(e) => { setSearchParam(e.target.value) }} onSearch={handleSearch} enterButton/>
                    <Select defaultValue="name" style={{ width: 120 }} onSelect={(e) => { setSearchType(e) }}>
                        <Option value="name">Tela</Option>
                        <Option value="rotation">Rotação</Option>
                        {
                            localStorage.getItem('type') === 'admin' ? <Option value="store">Loja</Option> : null
                        }
                    </Select>
                </div>
                <div>

                </div>
            </div>
            <DataTable value={screens} selectionMode="radiobutton" selection={selection} onSelectionChange={(e) => setSelection(e.value.id)} dataKey="id">
                <Column selectionMode="single" headerStyle={{ width: '3em' }}></Column>
                <Column field="id"  header="id"></Column>
                <Column field="name" sortable  header="Tela"></Column>
                <Column field="link"  header="Link final"></Column>
                <Column field="rotation" header="Rotação"></Column>
                {
                    localStorage.getItem('type') === 'admin' ? <Column field="store" sortable header="Loja"></Column> : <Column field="store" header="Loja"></Column>
                }
            </DataTable>
            <div style={{ margin: '10px', display: 'flex', justifyContent: 'space-between' }}>
                <Button type='primary' danger onClick={handleDelete}>
                    Deletar Tela
                </Button>
                <Button type='primary' onClick={handleEdit}>
                    Editar Tela
                </Button>
                <Button type='primary' onClick={() => setVisibleAdd(true)}>
                    Adicionar tela
                </Button>
            </div>
            <ModalDelScreenCtx.Provider value={{ visible, setVisible, selection, setSelection, refresh }}>
                <ModalDelScreen />
            </ModalDelScreenCtx.Provider>
            <ModalAddScreenCtx.Provider value={{ visibleAdd, setVisibleAdd, refresh }}>
                <ModalAddScreen />
            </ModalAddScreenCtx.Provider>
            <ModalEditScreenCtx.Provider value={{ selection, refresh, visibleEdit, setVisibleEdit, setSelection }}>
                <ModalEditScreen />
            </ModalEditScreenCtx.Provider>
        </Layout>
    )
}

export default Dashboard;