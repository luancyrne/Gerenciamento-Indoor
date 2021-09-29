import React from 'react';
import { Modal, Input, Space, Select, DatePicker } from 'antd';
import { FaStoreAlt } from 'react-icons/fa'
import { getStores } from '../../../Services/controller/store/getStore';
import { getLists } from '../../../Services/controller/lists/getLists.js';
import cadScreen from '../../../Services/controller/screens/cadScreen';
import { toast } from 'react-toastify';

export const ModalAddScreenCtx = React.createContext()

const { Option } = Select;

export class ModalAddScreen extends React.Component {
    static contextType = ModalAddScreenCtx
    constructor(props) {
        super(props)
        this.state = {
            data: {
                name: '',
                link: '',
                list_id: '',
                list_temp: '',
                rotation: '',
                store: '',
                dateStart: '',
                dateEnd: ''
            },
            lists: [],
            stores: []
        }
    }

    handleCancel = () => {
        this.context.setVisibleAdd()
        this.context.refresh()
    }

    handleAddScreen = () => {
        cadScreen(this.state.data.name, this.state.data.link, this.state.data.list_id, this.state.data.list_temp, this.state.data.rotation, this.state.data.store, this.state.data.dateStart, this.state.data.dateEnd).then(response => {
            toast(response.message, { theme: 'dark', type: response.type })
            if (response.type === 'success') {
                this.context.setVisibleAdd()
                this.context.refresh()
            }

        }).catch(err => {
            console.log(err)
        })
    }

    handleChangeData = (e) => {
        this.setState({ data: { ...this.state.data, [e.target.name]: e.target.value } })
    }

    componentDidMount() {
        getStores().then(items => {
            this.setState({ stores: items })
        }).catch(err => {
            console.log(err)
        })

        getLists().then(items => this.setState({ lists: items })).catch(err => {
            console.log(err)
        })
    }

    componentWillUnmount() {
        this.setState({
            data: {
                name: '',
                link: '',
                list_id: '',
                rotation: '',
                store: ''
            }
        })
    }

    render() {
        return (
            <Modal
                title={`Adicionar tela`}
                visible={this.context.visibleAdd}
                onOk={this.handleAddScreen}
                onCancel={this.handleCancel}
                okText="Confirmar"
                cancelText="Cancelar"
            >
                <div style={{ display: 'flex', flexDirection: 'column', alignContent: 'center' }}>
                    <Space direction="vertical">
                        <Input onChange={this.handleChangeData} placeholder="Nome da tela" name='name' value={this.state.data.name} prefix={<FaStoreAlt />} />
                        <Input onChange={this.handleChangeData} value={this.state.data.link} name="link" addonBefore={`${window.location.origin}/api/tv.php?view=`} defaultValue="link da tela" />
                        <label>Selecione qual lista de reprodução pertence a esta loja:</label>
                        <Select onChange={(e) => { this.setState({ data: { ...this.state.data, 'list_id': e } }) }} defaultValue={this.state.data.list_id} value={this.state.data.list_id} name="list_id" style={{ width: 120 }}>
                            {
                                this.state.lists.map(list => {
                                    return (
                                        <Option key={list.id} value={list.id}>{list.name}</Option>
                                    )
                                })
                            }
                        </Select>
                        <label>Selecione a loja que pertence esta tela:</label>
                        <Select name="store" defaultValue={this.state.data.store} value={this.state.data.store} onChange={(e) => { this.setState({ data: { ...this.state.data, 'store': e } }) }} style={{ width: 120 }}>
                            {
                                localStorage.getItem('type') === 'admin' ? this.state.stores.map(store => {
                                    return (
                                        <Option key={store.id} value={store.name}>{store.name}</Option>
                                    )
                                }) : <Option key='0' value={localStorage.getItem('store')}>{localStorage.getItem('store')}</Option>
                            }
                        </Select>
                        <label>Lista temporaria:</label>
                        <label style={{ color: 'red' }}>(Selecione uma lista temporaria caso queira que ela seja reproduzida por um periodo ou deixe em branco)</label>
                        <Select onChange={(e) => { this.setState({ data: { ...this.state.data, 'list_temp': e } }) }} defaultValue={this.state.data.list_temp} value={this.state.data.list_temp} name="list_temp" style={{ width: 120 }}>
                            {
                                this.state.lists.map(list => {
                                    return (
                                        <Option key={list.id} value={list.id}>{list.name}</Option>
                                    )
                                })
                            }
                        </Select>
                        {
                            this.state.data.list_temp ? (
                                <>
                                    <label>Selecione o periodo que sera reproduzido:</label>
                                    <div style={{ display: 'flex', justifyContent: 'center', flexDirection: 'column' }}>
                                        <label>Data inicial</label>
                                        <DatePicker onChange={(e) => {
                                            this.setState({ data: { ...this.state.data, 'dateStart': e.format('YYYY-MM-DD') } })
                                        }}></DatePicker>
                                        <label>Data Final</label>
                                        <DatePicker onChange={(e) => {
                                            this.setState({ data: { ...this.state.data, 'dateEnd': e.format('YYYY-MM-DD') } })
                                        }}></DatePicker>
                                    </div>
                                </>) : null
                        }
                        <label>Selecione a rotação da tela:</label>
                        <Select defaultValue={this.state.data.rotation} value={this.state.data.rotation} name="rotation" onChange={(e) => { this.setState({ data: { ...this.state.data, 'rotation': e } }) }} style={{ width: 120 }}>
                            <Option value="horizontal">horizontal</Option>
                            <Option value="vertical">vertical</Option>
                        </Select>
                    </Space>
                </div>
            </Modal>
        )
    }
}