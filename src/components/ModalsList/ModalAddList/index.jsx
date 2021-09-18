import React from 'react';
import { Modal, Input, Select } from 'antd';
import { getStores } from '../../../Services/controller/store/getStore';
import cadList from '../../../Services/controller/lists/cadList';
import { toast } from 'react-toastify';

const { Option } = Select

export const ModalAddListCtx = React.createContext();

export class ModalAddList extends React.Component {
    static contextType = ModalAddListCtx
    constructor(props) {
        super(props)
        this.state = {
            stores: [],
            data: {
                name: '',
                store: ''
            }
        }
    }

    componentDidMount() {
        getStores().then(store => {
            this.setState({ stores: store })
        }).catch(err => {
            console.log(err)
        })
    }

    handleData = (e) => {
        this.setState({ data: { ...this.state.data, [e.target.name]: e.target.value } })
    }

    handleCadList = () => {
        cadList(this.state.data.name, this.state.data.store).then(response => {
            toast(response.message, { theme: 'dark', type: response.type })
            if (response.type === 'success') {
                this.context.setVisibleAdd()
                this.context.refresh()
                this.setState({
                    data: {
                        name: '',
                        store: ''
                    }
                })

            }

        }).catch(err => {
            console.log(err)
        })
    }

    render() {
        return (
            <Modal
                title="Adicionar nova lista"
                visible={this.context.visibleAdd}
                onCancel={() => {
                    this.context.setVisibleAdd(false)
                    this.setState({data:{
                        name: '',
                        store: ''
                    }})
                }}
                onOk={this.handleCadList}
                okText='Confirmar'
                cancelText="Cancelar"
            >
                <Input placeholder='Nome da lista' name="name" value={this.state.data.name} onChange={this.handleData}></Input>
                <div style={{ display: 'flex', flexDirection: 'column' }}>
                    <label style={{ marginTop: '10px' }}>Selecione a loja a qual pertence esta lista:</label>
                    <Select style={{ width: '100px' }} value={this.state.data.store} onSelect={(e) => { this.setState({data:{...this.state.data, store:e}})}}>
                        {
                            localStorage.getItem('type') === 'admin' ? this.state.stores.map(item => {
                                return (
                                    <Option key={item.id} value={item.name}>{item.name}</Option>
                                )
                            }) : <Option key='0' value={localStorage.getItem('store')}>{localStorage.getItem('store')}</Option>
                        }
                    </Select>
                </div>
            </Modal>
        )
    }
}