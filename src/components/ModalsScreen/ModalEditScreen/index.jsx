import React from 'react';
import { Modal, Input, Space, Select, Spin } from 'antd';
import { FaStoreAlt } from 'react-icons/fa'
import { getLists } from '../../../Services/controller/lists/getLists.js';
import upScreen from '../../../Services/controller/screens/upScreen';
import { toast } from 'react-toastify';
import { getStores } from '../../../Services/controller/store/getStore';
import { getScreen } from '../../../Services/controller/screens/getScreens.js';

export const ModalEditScreenCtx = React.createContext()

const { Option } = Select;

export class ModalEditScreen extends React.Component {
    static contextType = ModalEditScreenCtx
    constructor(props) {
        super(props)
        this.state = {
            data: {
                id: '',
                name: '',
                link: '',
                list_id: '',
                rotation: '',
                store: ''
            },
            stores: [],
            lists: [],
            spin: true
        }
    }

    setStores = (stores) => {
        this.setState({ stores })
    }

    setLists = (lists) => {
        this.setState({ lists })
    }

    setData = (data) => {
        this.setState({ data })
    }

    handleUpScreen = () => {
        upScreen(this.context.selection, this.state.data.name, this.state.data.link, this.state.data.list_id, this.state.data.rotation, this.state.data.store).then(response => {
            toast(response.message, { theme: 'dark', type: response.type })
            if (response.type === 'success') {
                this.context.setVisibleEdit()
                this.context.setSelection(null)
                this.context.refresh()
            }

        }).catch(err => {
            console.log(err)
        })
    }

    handleCancel = () => {
        this.context.setVisibleEdit()
        this.context.refresh()
    }

    handleChangeData = (e) => {
        this.setData({ ...this.state.data, [e.target.name]: e.target.value })
    }

    componentDidMount() {
        getStores().then(items => {
            this.setStores(items)
        }).catch(err => {
            console.log(err)
        })

        getLists().then(items => {
            this.setLists(items)
        }).catch(err => {
            console.log(err)
        })

        getScreen(this.context.selection).then(response => {
            this.setData({
                id: response.id,
                name: response.name,
                link: response.link,
                list_id: response.list_id,
                rotation: response.rotation,
                store: response.store
            })
            this.setState({spin:false})
        })
    }

    componentWillUnmount() {
        this.setData({
            id: '',
            name: '',
            link: '',
            list_id: '',
            rotation: '',
            store: ''
        })
    }

    render() {

        return (
            <Modal
                title={`Editar tela ${this.context.selection}`}
                visible={this.context.visibleEdit}
                onOk={this.handleUpScreen}
                onCancel={this.handleCancel}
                okText="Confirmar"
                cancelText="Cancelar"
            >
                <Spin tip="Buscando informações existentes" spinning={this.state.spin}>
                    <div style={{ display: 'flex', flexDirection: 'column', alignContent: 'center' }}>
                        <Space direction="vertical">
                            <Input onChange={this.handleChangeData} placeholder="Nome da tela" name='name' value={this.state.data.name} prefix={<FaStoreAlt />} />
                            <Input onChange={this.handleChangeData} value={this.state.data.link} name="link" addonBefore={`${window.location.origin}/`} defaultValue={this.state.data.link} />
                            <label>Selecione qual lista de reprodução pertence a esta loja:</label>
                            <Select onChange={(e) => { this.setData({ ...this.state.data, list_id: e }) }} defaultValue={this.state.data.list_id} value={this.state.data.list_id} name="list_id" style={{ width: 120 }}>
                                {
                                    this.state.lists.map(list => {
                                        return (
                                            <Option key={list.id} value={list.id}>{list.name}</Option>
                                        )
                                    })
                                }
                            </Select>
                            <label>Selecione a loja que pertence esta tela:</label>
                            <Select name="store" value={this.state.data.store} onChange={(e) => this.setData({ ...this.state.data, 'store': e })} style={{ width: 120 }}>
                                {
                                    localStorage.getItem('type') === 'admin' ? this.state.stores.map(store => {
                                        return (
                                            <Option key={store.id} value={store.name}>{store.name}</Option>
                                        )
                                    }) : <Option key='0' value={localStorage.getItem('store')}>{localStorage.getItem('store')}</Option>
                                }
                            </Select>
                            <label>Selecione a rotação da tela:</label>
                            <Select defaultValue={this.state.data.rotation} value={this.state.data.rotation} name="rotation" onChange={(e) => { this.setData({ ...this.state.data, 'rotation': e }) }} style={{ width: 120 }}>
                                <Option value="horizontal">horizontal</Option>
                                <Option value="vertical">vertical</Option>
                            </Select>
                        </Space>
                    </div>
                </Spin>
            </Modal>
        )
    }
}