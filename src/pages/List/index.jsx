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

class List extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            list: [],
            selection: 0,
            visible: false,
            visibleEdit: false,
            visibleAdd: false,
            searchParam: '',
            filterParam: ''
        }
    }

    refresh = () => {
        getLists().then(response => this.setState({ list: response })).catch(err => {
            console.log(err)
        })
    }

    componentDidMount() {
        getLists().then(response => this.setState({ list: response })).catch(err => {
            console.log(err)
        })
    }

    handleDelete = () => {
        if (this.state.selection === 0 || this.state.selection === null) {
            toast('Selecione uma lista', { theme: 'dark', type: 'info' })
        } else {
            this.setState({ visible: true })
        }
        
    }

    handleEdit = () => {
        if (this.state.selection === 0 || this.state.selection === null) {
            toast('Selecione uma lista', { theme: 'dark', type: 'info' })
        } else {
            this.setState({ visibleEdit: true })
        }
    }

    setVisible = ()=>{
        this.setState({visible:!this.state.visible})
    }

    setVisibleEdit = ()=>{
        this.setState({visibleEdit:!this.state.visibleEdit})
    }

    setVisibleAdd = ()=>{
        this.setState({visibleAdd:!this.state.visibleAdd})
    }

    handleSearch = () => {
        filter(this.state.filterParam, this.state.searchParam, 'list').then(response => {
            this.setState({ list: response })
        }).catch(err => {
            console.log(err)
        })
    }

    setSelect = (e) => {
        this.setState({ selection: e })
    }

    render() {
        return (
            <Layout>
                <ToastContainer />
                <div style={{ height: '60px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '10px' }}>
                    <div>
                        <Search placeholder="Digite oque deseja encontrar..." style={{ width: 250 }} onChange={(e) => { this.setState({ searchParam: e.target.value }) }} onSearch={this.handleSearch} enterButton />
                        <Select defaultValue="name" style={{ width: 120 }} onSelect={(e) => { this.setState({ filterParam: e }) }}>
                            <Option value="name">Nome</Option>
                            {
                                localStorage.getItem('type') === 'admin' ? <Option value="store">Loja</Option> : null
                            }
                        </Select>
                    </div>
                    <div>

                    </div>
                </div>
                <DataTable value={this.state.list} selectionMode="radiobutton" selection={this.state.selection} onSelectionChange={(e) => this.setState({ selection: e.value.id })} dataKey="id">
                    <Column selectionMode="single" headerStyle={{ width: '3em' }}></Column>
                    <Column field="id" header="id"></Column>
                    <Column field="name" sortable header="Lista"></Column>
                    <Column field="store" sortable header="Loja"></Column>
                </DataTable>
                <div style={{ margin: '10px', display: 'flex', justifyContent: 'space-between' }}>
                    <Button type='primary' danger onClick={this.handleDelete}>
                        Deletar Lista
                    </Button>
                    <Button type='primary' onClick={this.handleEdit}>
                        Editar Lista
                    </Button>
                    <Button type='primary' onClick={() => { this.setState({ visibleAdd: true }) }}>
                        Adicionar Lista
                    </Button>
                </div>
                {
                    this.state.visible ? (<ModalDelListCtx.Provider value={{ visible: this.state.visible, setVisible: this.setVisible, selection: this.state.selection, refresh: this.refresh, setSelection: this.setSelect }}>
                        <ModalDelList />
                    </ModalDelListCtx.Provider>) : null
                }
                {
                    this.state.visibleEdit ? (<ModalEditListCtx.Provider value={{ visibleEdit: this.state.visibleEdit, setVisibleEdit: this.setVisibleEdit, selection: this.state.selection, refresh: this.refresh, setSelection: this.setSelect }}>
                        <ModalEditList />
                    </ModalEditListCtx.Provider>) : null
                }
                {
                    this.state.visibleAdd ? (<ModalAddListCtx.Provider value={{ visibleAdd: this.state.visibleAdd, setVisibleAdd: this.setVisibleAdd, refresh: this.refresh }}>
                        <ModalAddList />
                    </ModalAddListCtx.Provider>) : null
                }
            </Layout>
        )
    }
}

export default List;