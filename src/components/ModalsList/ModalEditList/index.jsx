import { Modal, Input, Select } from "antd";
import React from "react";
import { getStores } from '../../../Services/controller/store/getStore';
import upList from '../../../Services/controller/lists/upList'
import { toast } from "react-toastify";
import { getList } from '../../../Services/controller/lists/getLists'

const { Option } = Select

export const ModalEditListCtx = React.createContext();

export const ModalEditList = () => {
    const initialState = {
        name: '',
        store: ''
    }
    const { visibleEdit, setVisibleEdit, selection, setSelection, refresh } = React.useContext(ModalEditListCtx)
    const [stores, setStores] = React.useState([]);
    const [data, setData] = React.useState(initialState)

    const handleChangeData = (e) => {
        setData({ ...data, [e.target.name]: e.target.value })
    }


    getList(selection).then(response => {
        setData({
            name: response.name,
            store: response.store
        })
    }).catch(err => {
        console.log(err)
    })

    React.useEffect(() => {

        getStores().then(response => {
            setStores(response)
        }).catch(err => {
            console.log(err)
        })

    }, [])


    const handleUpdate = () => {
        if (data.store === '' || data.store === null) {
            toast('Confirme a loja a qual pertence a esta lista', { theme: 'dark', type: 'info' })
        } else {
            if (data.name === '' || data.name === null) {
                toast('Confirme o nome desta lista', { theme: 'dark', type: 'info' })
            } else {
                upList(selection, data.name, data.store).then(response => {
                    toast(response.message, { theme: 'dark', type: response.type })
                    if (response.type === 'success') {
                        setSelection(null)
                        setVisibleEdit(false)
                        refresh()
                    }
                })
            }
        }
    }

    return (
        <Modal
            title={`Editar informações de list ${selection}?`}
            visible={visibleEdit}
            onCancel={() => {
                refresh()
                setVisibleEdit(false)
            }}
            onOk={handleUpdate}
            okText="Confirmar"
            cancelText="Cancelar"
        >
            <Input onChange={handleChangeData} placeholder="Nome da Lista" name='name' value={data.name} allowClear />
            <div style={{ display: 'flex', flexDirection: 'column' }}>
                <label style={{ marginTop: '10px' }}>Selecione a loja a qual pertence esta lista</label>
                <Select name="store" defaultValue={data.store} value={data.store} onChange={(e) => { setData({ ...data, 'store': e }) }} style={{ width: 120 }}>
                    {
                        localStorage.getItem('type') === 'admin' ? stores.map(store => {
                            return (
                                <Option key={store.id} value={store.name}>{store.name}</Option>
                            )
                        }) : <Option key='0' value={localStorage.getItem('store')}>{localStorage.getItem('store')}</Option>
                    }
                </Select>
            </div>
        </Modal>
    )
}