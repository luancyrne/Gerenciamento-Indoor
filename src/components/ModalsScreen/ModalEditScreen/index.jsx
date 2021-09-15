import React from 'react';
import { Modal, Input, Space, Select } from 'antd';
import { FaStoreAlt } from 'react-icons/fa'
import getStoreGuest from '../../../Services/controller/store/getStoreGuest';
import getLists from '../../../Services/controller/lists/getLists.js';
import upScreen from '../../../Services/controller/screens/upScreen';
import { toast } from 'react-toastify';
import { getScreen } from '../../../Services/controller/screens/getScreens';

export const ModalEditScreenCtx = React.createContext()

const { Option } = Select;

export const ModalEditScreen = () => {

    const { visibleEdit, setVisibleEdit, refresh, selection, setSelection } = React.useContext(ModalEditScreenCtx);
    const [stores, setStores] = React.useState([]);
    const [lists, setLists] = React.useState([]);
    const [data, setData] = React.useState({
        id:selection,
        name: '',
        link: '',
        list_id: '',
        rotation: '',
        store: ''
    })

    const handleUpScreen = () => {
        upScreen(data.id,data.name, data.link, data.list_id, data.rotation, data.store).then(response => {
            toast(response.message, { theme: 'dark', type: response.type })
            if (response.type === 'success') {
                setVisibleEdit(false)
                setSelection(null)
                refresh()
            }
            
        }).catch(err => {
            console.log(err)
        })
    }

    const handleCancel = () => {
        setVisibleEdit(false)
        refresh()
    }

    React.useEffect(() => {
        getStoreGuest().then(items => {
            setStores(items)
        }).catch(err => {
            console.log(err)
        })

        getLists().then(items => setLists(items)).catch(err => {
            console.log(err)
        })

            getScreen(selection).then(item=>{
                setData({
                    id:item.id,
                    name:item.name,
                    link:item.link,
                    list_id:item.list_id,
                    rotation:item.rotation,
                    store:item.store
                })
            }).catch(err=>{
                console.log(err)
            })


    }, [visibleEdit,selection])

    const handleChangeData = (e) => {
        setData({ ...data, [e.target.name]: e.target.value })
    }

    return (
        <>
            <Modal
                title={`Editar tela`}
                visible={visibleEdit}
                onOk={handleUpScreen}
                onCancel={handleCancel}
                okText="Confirmar"
                cancelText="Cancelar"
            >
                <div style={{ display: 'flex', flexDirection: 'column', alignContent: 'center' }}>
                    <Space direction="vertical">
                        <Input onChange={handleChangeData} placeholder="Nome da tela" name='name' value={data.name} prefix={<FaStoreAlt />} />
                        <Input onChange={handleChangeData} value={data.link} name="link" addonBefore={`${window.location.origin}/`} defaultValue="link da tela" />
                        <label>Selecione qual lista de reprodução pertence a esta loja:</label>
                        <Select onChange={(e) => { setData({ ...data, 'list_id': e }) }} defaultValue={data.list_id} name="list_id" style={{ width: 120 }}>
                            {
                                lists.map(list => {
                                    return (
                                        <Option key={list.id} value={list.name}>{list.name}</Option>
                                    )
                                })
                            }
                        </Select>
                        <label>Selecione a loja que pertence esta tela:</label>
                        <Select name="store" defaultValue={data.store} onChange={(e) => { setData({ ...data, 'store': e }) }} style={{ width: 120 }}>
                            {
                                stores.map(store => {
                                    return (
                                        <Option key={store.id} value={store.name}>{store.name}</Option>
                                    )
                                })
                            }
                        </Select>
                        <label>Selecione a rotação da tela:</label>
                        <Select defaultValue={data.rotation} name="rotation" onChange={(e) => { setData({ ...data, 'rotation': e }) }} style={{ width: 120 }}>
                            <Option value="horizontal">horizontal</Option>
                            <Option value="vertical">vertical</Option>
                        </Select>
                    </Space>
                </div>
            </Modal>
        </>
    )
}