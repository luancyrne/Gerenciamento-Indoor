import React from "react";
import { Modal, Input, Select } from "antd";
import { getStores } from "../../../Services/controller/store/getStore";
import cadUser from "../../../Services/controller/users/cadUser";
import { toast } from "react-toastify";

export const ModalAddUserCtx = React.createContext();

export const ModalAddUser = () => {

    const { visibleAdd, setVisibleAdd, refresh } = React.useContext(ModalAddUserCtx)
    const [stores, setStores] = React.useState([]);
    const [data, setData] = React.useState({
        name: '',
        password: '',
        store: '',
        type: ''
    })

    const handleData = (e) => {
        setData({ ...data, [e.target.name]: e.target.value })
    }

    const handleType = (e) => {
        setData({ ...data, type: e })
    }

    const handleStore = (e) => {
        setData({ ...data, store: e })
    }

    React.useEffect(() => {
        getStores().then(response => {
            setStores(response)
        }).catch(err => console.log(err))
    }, [])

    const handleCadUser = () => {
        cadUser(data.name, data.password, data.store, data.type).then(response => {
            toast(response.message, { theme: 'dark', type: response.type })
            if (response.type === 'success') {
                setVisibleAdd(false)
                refresh()
            }
        }).catch(err=>{console.log(err)})
    }

    return (
        <Modal
            visible={visibleAdd}
            onCancel={() => {
                setVisibleAdd(false)
                refresh()
            }}
            title="Adicionar usuário"
            cancelText="Cancelar"
            okText="Confirmar"
            onOk={handleCadUser}
        >
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
        </Modal>
    )
}