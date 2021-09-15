import React from "react";
import { Modal, Input, Select } from "antd";
import { getStores } from '../../../Services/controller/store/getStore';
import upUser from "../../../Services/controller/users/upUser";
import { toast } from "react-toastify";

export const ModalEditUserCtx = React.createContext();

export const ModalEditUser = () => {
    const { visibleEdit, setVisibleEdit, selection, refresh, setSelection } = React.useContext(ModalEditUserCtx);
    const [stores, setStores] = React.useState([]);
    const [data, setData] = React.useState({
        name: '',
        password: '',
        type: '',
        store: ''
    });

    React.useEffect(() => {
        getStores().then(response => {
            setStores(response)
        }).catch(err => console.log(err))

    }, []);

    const handleData = (e) => {
        setData({ ...data, [e.target.name]: e.target.value })
    }

    const handleType = (e) => {
        setData({ ...data, type: e })
    }

    const handleStore = (e) => {
        setData({ ...data, store: e })
    }

    const handleUpdate = () => {
        upUser(selection, data.name, data.password, data.store, data.type).then(response => {
            toast(response.message, { theme: "dark", type: response.type })
            if (response.type === 'success') {
                setVisibleEdit(false)
                setSelection(null)
                refresh()
            }
        }).catch(err => {
            console.log(err)
        })
    }
    return (
        <Modal
            title={`Editar informações`}
            visible={visibleEdit}
            onOk={handleUpdate}
            onCancel={() => {
                setVisibleEdit(false)
                refresh()
            }}
            okText="Confirmar"
            cancelText="Cancelar"
        >
            {
                localStorage.getItem('type') === 'admin' ?
                    <>
                        <Input style={{ marginTop: '10px' }} placeholder="Nome" name="name" onChange={handleData}></Input>
                        <Input.Password style={{ marginTop: '10px' }} placeholder="Senha" name="password" onChange={handleData}></Input.Password>
                        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                            <div style={{ display: 'flex', flexDirection: "column", marginTop: "10px" }}>
                                <label>Selecione o tipo do perfil:</label>
                                <Select style={{ width: '100px', marginTop: '10px' }} onChange={handleType}>
                                    <Select.Option key="1" value="admin">Admin</Select.Option>
                                    <Select.Option key="2" value="user">Usuário</Select.Option>
                                </Select>
                            </div>
                            <div style={{ display: 'flex', flexDirection: "column" }}>
                                <label>Selecione a loja:</label>
                                <Select style={{ width: '100px', marginTop: '10px' }} onSelect={handleStore}>
                                    {
                                        stores.map(item => {
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