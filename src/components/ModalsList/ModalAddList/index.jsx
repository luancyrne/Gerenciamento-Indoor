import React from 'react';
import { Modal, Input, Select } from 'antd';
import { getStores } from '../../../Services/controller/store/getStore';
import cadList from '../../../Services/controller/lists/cadList';
import { toast } from 'react-toastify';

const { Option } = Select

export const ModalAddListCtx = React.createContext();

export const ModalAddList = () => {

    const { visibleAdd, setVisibleAdd, refresh } = React.useContext(ModalAddListCtx);
    const [stores, setStores] = React.useState([]);
    const [data, setData] = React.useState({
        name: '',
        store: ''
    })

    getStores().then(store => {
        setStores(store)
    }).catch(err => {
        console.log(err)
    })

    const handleData = (e) => {
        setData({ ...data, [e.target.name]: e.target.value })
    }

    const handleCadList = () => {
        cadList(data.name, data.store).then(response => {
            toast(response.message, { theme: 'dark', type: response.type })
            if (response.type === 'success') {
                setVisibleAdd(false)
                refresh()
                setData({
                    name: '',
                    store: ''
                })
            }

        }).catch(err => {
            console.log(err)
        })
    }

    return (
        <Modal
            title="Adicionar nova lista"
            visible={visibleAdd}
            onCancel={() => {
                setVisibleAdd(false)
                setData({
                    name: '',
                    store: ''
                })
            }}
            onOk={handleCadList}
            okText='Confirmar'
            cancelText="Cancelar"
        >
            <Input placeholder='Nome da lista' name="name" value={data.name} onChange={handleData}></Input>
            <div style={{display:'flex', flexDirection:'column'}}>
                <label style={{marginTop:'10px'}}>Selecione a loja a qual pertence esta lista:</label>
                <Select style={{ width: '100px' }} value={data.store} onSelect={(e) => { setData({ ...data, store: e }) }}>
                    {
                        localStorage.getItem('type') === 'admin' ? stores.map(item => {
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