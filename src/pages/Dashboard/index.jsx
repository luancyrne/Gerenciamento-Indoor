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


class Dashboard extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            screens: [],
            selection: 0,
            visible: false,
            visibleAdd: false,
            visibleEdit: false,
            searchParam: '',
            searchType: 'name'
        }


    }

    refresh = () => {
        getScreens().then(screens => this.setScreens(screens)).catch(err => {
            toast('Erro ao acessar telas', { theme: 'dark', type: 'warning' })
        })
    }

    componentDidMount() {
        this.refresh()
    }


    setScreens = (screens) => {
        this.setState({ screens })
    }

    setSelection = (selection) => {
        this.setState({ selection })
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

    setSearchParam = (searchParam) => {
        this.setState({ searchParam })
    }

    setSearchType = (searchType) => {
        this.setState({ searchType })
    }

    handleDelete = () => {
        if (this.state.selection) {
            this.setVisible()
        } else {
            toast('Selecione uma tela', { theme: 'dark', type: 'info' })
        }
    }

    handleEdit = () => {
        if (this.state.selection) {
            this.setVisibleEdit()
        } else {
            toast('Selecione uma tela', { theme: 'dark', type: 'info' })
        }
    }


    handleSearch = () => {
        if (this.state.searchParam === '') {
            this.refresh();
        } else {
            filter(this.state.searchType, this.state.searchParam, 'screens').then(response => {
                this.setScreens(response)
            }).catch(err => {
                console.log(err)
            })
        }
    }

    render() {
        return (

            <Layout>
                <ToastContainer />
                <div id="dashboard" style={{ height: '60px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '10px' }}>
                    <div>
                        <Search placeholder="Digite oque deseja encontrar..." style={{ width: 250 }} onChange={(e) => { this.setSearchParam(e.target.value) }} onSearch={this.handleSearch} enterButton />
                        <Select defaultValue="name" style={{ width: 120 }} onSelect={(e) => { this.setSearchType(e) }}>
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
                <DataTable value={this.state.screens} selectionMode="radiobutton" selection={this.state.selection} onSelectionChange={(e) => { this.setSelection(e.value.id) }} dataKey="id">
                    <Column selectionMode="single" headerStyle={{ width: '3em' }}></Column>
                    <Column field="id" header="id"></Column>
                    <Column field="name" sortable header="Tela"></Column>
                    <Column field="link" header="Link final"></Column>
                    <Column field="rotation" header="Rotação"></Column>
                    {
                        localStorage.getItem('type') === 'admin' ? <Column field="store" sortable header="Loja"></Column> : <Column field="store" header="Loja"></Column>
                    }
                </DataTable>
                <div style={{ margin: '10px', display: 'flex', justifyContent: 'space-between' }}>
                    <Button type='primary' danger onClick={this.handleDelete}>
                        Deletar Tela
                    </Button>
                    <Button type='primary' onClick={this.handleEdit}>
                        Editar Tela
                    </Button>
                    <Button type='primary' onClick={() => {
                        this.setVisibleAdd()
                    }}>
                        Adicionar tela
                    </Button>
                </div>
                <ModalDelScreenCtx.Provider value={{ visible: this.state.visible, setVisible: this.setVisible, selection: this.state.selection, setSelection: this.setSelection, refresh: this.refresh }}>
                    <ModalDelScreen />
                </ModalDelScreenCtx.Provider>
                <ModalAddScreenCtx.Provider value={{ visibleAdd: this.state.visibleAdd, setVisibleAdd: this.setVisibleAdd, refresh: this.refresh }}>
                    <ModalAddScreen />
                </ModalAddScreenCtx.Provider>
                {
                    this.state.visibleEdit ? (<ModalEditScreenCtx.Provider value={{ selection: this.state.selection, refresh: this.refresh, visibleEdit: this.state.visibleEdit, setVisibleEdit: this.setVisibleEdit, setSelection: this.setSelection }}>
                        <ModalEditScreen />
                    </ModalEditScreenCtx.Provider>) : null
                }
            </Layout>
        )
    }
}


export default Dashboard;