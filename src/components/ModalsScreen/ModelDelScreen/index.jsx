import React from 'react';
import { Modal } from 'antd';
import delScreen from '../../../Services/controller/screens/delScreen';
import { toast } from 'react-toastify';

export const ModalDelScreenCtx = React.createContext()

export const ModalDelScreen = () => {
    const { visible, setVisible, selection, setSelection, refresh } = React.useContext(ModalDelScreenCtx);

    const handleDeleteScreen = () => {
        delScreen(selection).then(response => {
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
        <>
            <Modal
                title={`Tem certeza que deja deletar a tela ${selection} ?`}
                visible={visible}
                onOk={handleDeleteScreen}
                onCancel={handleCancel}
                okText="Confirmar"
                cancelText="Cancelar"
            >
                <p>Ao deletar a tela não sera possível restaurar</p>
            </Modal>
        </>
    )
}