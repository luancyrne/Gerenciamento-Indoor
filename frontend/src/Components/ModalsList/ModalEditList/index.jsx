import { Modal, Input, Select, Spin } from "antd";
import React from "react";
import { getStores } from '../../../Services/controller/store/getStore';
import upList from '../../../Services/controller/lists/upList'
import { toast } from "react-toastify";
import { getList } from '../../../Services/controller/lists/getLists'

const { Option } = Select

export const ModalEditListCtx = React.createContext();

export class ModalEditList extends React.Component {
    static contextType = ModalEditListCtx
    constructor(props) {
        super(props)
        this.state = {
            stores: [],
            data: {
                name: '',
                store: ''
            },
            loading: true
        }
    }

    handleChangeData = (e) => {
        this.setState({ data: { ...this.state.data, [e.target.name]: e.target.value } })
    }

    componentDidMount() {
        getList(this.context.selection).then(response => {
            this.setState({
                data: {
                    name: response.name,
                    store: response.store
                }
            })

            this.setState({loading:false})
        }).catch(err => {
            console.log(err)
        })

        getStores().then(response => {
            this.setState({ stores: response })
        }).catch(err => {
            console.log(err)
        })
    }

    handleUpdate = () => {
        if (this.state.data.store === '' || this.state.data.store === null) {
            toast('Confirme a loja a qual pertence a esta lista', { theme: 'dark', type: 'info' })
        } else {
            if (this.state.data.name === '' || this.state.data.name === null) {
                toast('Confirme o nome desta lista', { theme: 'dark', type: 'info' })
            } else {
                upList(this.context.selection, this.state.data.name, this.state.data.store).then(response => {
                    toast(response.message, { theme: 'dark', type: response.type })
                    if (response.type === 'success') {
                        this.context.setSelection(null)
                        this.context.setVisibleEdit()
                        this.context.refresh()
                    }
                })
            }
        }
    }

    render() {
        return (
            <Modal
                title={`Editar informações de list ${this.context.selection}?`}
                visible={this.context.visibleEdit}
                onCancel={() => {
                    this.context.refresh()
                    this.context.setVisibleEdit()
                    this.context.setSelection(null)
                }}
                onOk={this.handleUpdate}
                okText="Confirmar"
                cancelText="Cancelar"
            >
                <Spin tip="Carregando informações" spinning={this.state.loading}>
                    <Input onChange={this.handleChangeData} placeholder="Nome da Lista" name='name' value={this.state.data.name} allowClear />
                    <div style={{ display: 'flex', flexDirection: 'column' }}>
                        <label style={{ marginTop: '10px' }}>Selecione a loja a qual pertence esta lista</label>
                        <Select name="store" defaultValue={this.state.data.store} value={this.state.data.store} onChange={(e) => { this.setState({ data: { ...this.state.data, 'store': e } }) }} style={{ width: 120 }}>
                            {
                                localStorage.getItem('type') === 'admin' ? this.state.stores.map(store => {
                                    return (
                                        <Option key={store.id} value={store.name}>{store.name}</Option>
                                    )
                                }) : <Option key='0' value={localStorage.getItem('store')}>{localStorage.getItem('store')}</Option>
                            }
                        </Select>
                    </div>
                </Spin>
            </Modal>
        )
    }
}