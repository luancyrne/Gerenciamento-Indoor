import React from "react";
import { Modal, Input, Select } from "antd";
import { getStores } from '../../../Services/controller/store/getStore';
import upUser from "../../../Services/controller/users/upUser";
import { toast } from "react-toastify";

export const ModalEditUserCtx = React.createContext();

export class ModalEditUser extends React.Component {
    static contextType = ModalEditUserCtx

    state = {
        stores: [],
        data: {
            name: '',
            password: '',
            type: '',
            store: ''
        }
    }

    componentDidMount() {
        getStores().then(response => {
            this.setState({ stores: response })
        }).catch(err => console.log(err))
    }

    handleData = (e) => {
        this.setState({ data: { ...this.state.data, [e.target.name]: e.target.value } })
    }

    handleType = (e) => {
        this.setState({ data: { ...this.state.data, type: e } })
    }

    handleStore = (e) => {
        this.setState({ data: { ...this.state.data, store: e } })
    }

    handleUpdate = () => {
        upUser(this.context.selection, this.state.data.name, this.state.data.password, this.state.data.store, this.state.data.type).then(response => {
            toast(response.message, { theme: "dark", type: response.type })
            if (response.type === 'success') {
                this.context.setVisibleEdit(false)
                this.context.setSelection(null)
                this.context.refresh()
            }
        }).catch(err => {
            console.log(err)
        })
    }

    render() {
        return (
            <Modal
                title={`Editar informações`}
                visible={this.context.visibleEdit}
                onOk={this.handleUpdate}
                onCancel={() => {
                    this.context.setVisibleEdit(false)
                    this.context.refresh()
                }}
                okText="Confirmar"
                cancelText="Cancelar"
            >
                {
                    localStorage.getItem('type') === 'admin' ?
                        <>
                            <Input style={{ marginTop: '10px' }} placeholder="Nome" name="name" onChange={this.handleData}></Input>
                            <Input.Password style={{ marginTop: '10px' }} placeholder="Senha" name="password" onChange={this.handleData}></Input.Password>
                            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                                <div style={{ display: 'flex', flexDirection: "column", marginTop: "10px" }}>
                                    <label>Selecione o tipo do perfil:</label>
                                    <Select style={{ width: '100px', marginTop: '10px' }} onChange={this.handleType}>
                                        <Select.Option key="1" value="admin">Admin</Select.Option>
                                        <Select.Option key="2" value="user">Usuário</Select.Option>
                                    </Select>
                                </div>
                                <div style={{ display: 'flex', flexDirection: "column" }}>
                                    <label>Selecione a loja:</label>
                                    <Select style={{ width: '100px', marginTop: '10px' }} onSelect={this.handleStore}>
                                        {
                                            this.state.stores.map(item => {
                                                return (
                                                    <Select.Option key={item.id} value={item.name}>{item.name}</Select.Option>
                                                )
                                            })
                                        }
                                    </Select>
                                </div>
                            </div>
                        </>
                        :
                        <>
                            <Input placeholder="Nome"></Input>
                            <Input.Password placeholder="Senha"></Input.Password>
                        </>

                }
            </Modal>
        )
    }
}