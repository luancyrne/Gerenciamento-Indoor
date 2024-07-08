import React from 'react';
import { Modal, Input } from 'antd';
import { toast } from 'react-toastify';
import upStore from '../../../Services/controller/store/upStore';


export const ModalEditStoreCtx = React.createContext();

export const ModalEditStore = () => {

    const { visibleEdit, setVisibleEdit, selection, dataInformation, refresh, setSelection } = React.useContext(ModalEditStoreCtx);
    const [update, setUpdate] = React.useState('');

    const handleUpdate = () => {
        if (update) {
            upStore(selection, update).then(response => {
                toast(response.message, { theme: 'dark', type: response.type })
                refresh()
                if(response.type === 'success'){
                    setSelection(null)
                    setVisibleEdit(false)
                }
            }).catch(err => console.log(err))
        } else {
            toast('Antes de confirmar faça alguma alteração', { theme: "dark", type: 'info' })
        }
    }

    return (
        <Modal
            title={`Editar informações da loja ${selection}`}
            visible={visibleEdit}
            onOk={handleUpdate}
            onCancel={() => { setVisibleEdit(false) }}
            okText="Confirmar"
            cancelText="Cancelar"
        >
            <label>Nome da loja:</label>
            <Input placeholder={dataInformation} name='name' onChange={(e) => { setUpdate(e.target.value) }} />
        </Modal>
    )
}