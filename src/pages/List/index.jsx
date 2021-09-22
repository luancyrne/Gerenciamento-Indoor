import React from 'react';
import Layout from '../../Components/Layout/index';
import { getLists } from '../../Services/controller/lists/getLists';
import { ModalDelListCtx, ModalDelList } from '../../Components/ModalsList/ModalDelList';
import { ModalEditListCtx, ModalEditList } from '../../Components/ModalsList/ModalEditList';
import { ModalAddListCtx, ModalAddList } from '../../Components/ModalsList/ModalAddList';
import { ModalAddContentCtx, ModalAddContent } from '../../Components/ModalContent/ModalAddContent';
import { ModalDelContentCtx, ModalDelContent } from '../../Components/ModalContent/ModalDelContent';
import { Button, Input, Select, Collapse, Checkbox, Tag, Spin } from 'antd';
import { toast, ToastContainer } from 'react-toastify';
import filter from '../../Services/filter';
import getContents from '../../Services/controller/contents/getContents';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';


const { Search } = Input
const { Option } = Select
const { Panel } = Collapse;

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
            filterParam: '',
            accordionSelect: undefined,
            contents: [],
            visibleAddContent: false,
            loadingContent: false,
            contentIdSelection: undefined,
            visibleDelContent: false

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

    setVisible = () => {
        this.setState({ visible: !this.state.visible })
    }

    setVisibleEdit = () => {
        this.setState({ visibleEdit: !this.state.visibleEdit })
    }

    setVisibleAdd = () => {
        this.setState({ visibleAdd: !this.state.visibleAdd })
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

    setVisibleAddContent = () => {
        this.setState({ visibleAddContent: !this.state.visibleAddContent })
    }

    refreshContents = (accordion) => {
        getContents(accordion).then(response => {
            this.setState({ contents: response })
        }).catch(err => {
            console.log(err)
        })
    }

    setAccordionSelect = (accordion) => {
        this.setState({ accordionSelect: accordion })
        this.setState({ loadingContent: true })
        if (accordion) {
            getContents(accordion).then(response => {
                this.setState({ contents: response })
                this.setState({ loadingContent: false })
            }).catch(err => {
                console.log(err)
            })
        }
    }

    imageBodyTemplate(rowData) {
        return <img src={`http://indoor.lcprojects.net/api/uploads/${rowData.link}`} style={{ width: 150 }} onError={(e) => e.target.src = 'https://www.primefaces.org/wp-content/uploads/2020/05/placeholder.png'} alt={rowData.link} className="product-image" />;
    }

    setVisibleDelContent = () => {
        if (this.state.contentIdSelection === undefined || this.state.contentIdSelection === null) {
            toast('Selecione um conteúdo para deletar', { theme: 'dark', type: 'info' })
        } else {
            this.setState({ visibleDelContent: !this.state.visibleDelContent })
        }
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
                <Collapse
                    defaultActiveKey={['1']}
                    expandIconPosition={'right'}
                    style={{ margin: '10px 0', border: 'solid #fb8a2b36' }}
                    accordion
                    onChange={(e) => { this.setAccordionSelect(e) }}
                >
                    {
                        this.state.list.map(item => {
                            return (

                                <Panel key={item.id} header={(
                                    <div>
                                        <Checkbox onChange={(e) => this.setSelect(e.target.value)} checked={this.state.selection === item.id ? true : false} value={item.id} />
                                        <label style={{ marginLeft: 10 }}>Nome da lista - </label><Tag>{item.name}</Tag><label style={{ marginLeft: 10 }}>Loja - </label><Tag color="#2db7f5">{item.store}</Tag>
                                    </div>
                                )}>
                                    <Spin spinning={this.state.loadingContent} tip="Carregando conteúdos da lista">
                                        <DataTable value={this.state.contents} onSelectionChange={(e) => this.setState({ contentIdSelection: e.value.id })}>
                                            <Column selectionMode="single" headerStyle={{ width: '3em' }}></Column>
                                            <Column field="id" header="id"></Column>
                                            <Column field="name" header="Name" sortable></Column>
                                            <Column header="Image" body={this.imageBodyTemplate} />
                                            <Column field="link" header="Link"></Column>
                                        </DataTable>
                                    </Spin>
                                    <div style={{ margin: '10px', display: 'flex', justifyContent: 'space-between' }}>
                                        <Button type='primary' danger onClick={this.setVisibleDelContent}>
                                            Deletar conteúdo
                                        </Button>
                                        <Button type='primary' onClick={() => {
                                            this.setVisibleAddContent()
                                        }}>
                                            Adicionar conteúdo
                                        </Button>
                                    </div>
                                </Panel>

                            )
                        })
                    }
                </Collapse>
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
                {
                    this.state.visibleAddContent ? (<ModalAddContentCtx.Provider value={{ visibleAddContent: this.state.visibleAddContent, setVisibleAddContent: this.setVisibleAddContent, list: this.state.accordionSelect, refresh: this.refresh, accordionSelect: this.setAccordionSelect }}>
                        <ModalAddContent />
                    </ModalAddContentCtx.Provider>) : null
                }
                {
                    this.state.visibleDelContent ? (<ModalDelContentCtx.Provider value={{ visibleDelContent: this.state.visibleDelContent, setVisibleDelContent: this.setVisibleDelContent, refreshContents: this.refreshContents, contentIdSelection: this.state.contentIdSelection, list: this.state.accordionSelect }}>
                        <ModalDelContent />
                    </ModalDelContentCtx.Provider>) : null
                }
            </Layout>
        )
    }
}

export default List;