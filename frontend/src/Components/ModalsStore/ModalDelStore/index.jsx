import React from 'react';
import { Modal } from 'antd';
import delStore from '../../../Services/controller/store/delStore';
import { toast } from 'react-toastify';

export const ModalDelStoreCtx = React.createContext();

export const ModalDelStore = () => {

    const {selection, visible, setVisible, setSelection, refresh} = React.useContext(ModalDelStoreCtx);

    const handleDeleteStore = () => {
        delStore(selection).then(response => {
            toast(response.message, { theme: 'dark', type: response.type })
            refresh()
            setSelection(null)
            setVisible(false)
        })
    }

    const handleCancel = () => {
        setVisible(false)
        setSelection(null)
    }

    return (
        <Modal
            title={`Tem certeza que deja deletar a loja ${selection} ?`}
            visible={visible}
            onOk={handleDeleteStore}
            onCancel={handleCancel}
            okText="Confirmar"
            cancelText="Cancelar"
        >
            <p>Ao deletar a loja não sera possível restaurar</p>
        </Modal>
    )
}