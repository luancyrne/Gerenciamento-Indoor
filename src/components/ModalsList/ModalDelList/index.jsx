import { Modal } from "antd";
import React from "react";
import { toast } from "react-toastify";
import delList from "../../../Services/controller/lists/delList";

export const ModalDelListCtx = React.createContext();

export const ModalDelList = () => {

    const { visible, setVisible, selection, setSelection, refresh } = React.useContext(ModalDelListCtx)

    const handleDelete = () => {
        delList(selection).then(response => {
            toast(response.message, { theme: 'dark', type: response.type })
            if (response.type === 'success') {
                setVisible(false)
                setSelection(null)
                refresh()
            }
        }).catch(err => {
            console.log(err)
        })
    }

    return (
        <Modal
            title={`Deseja deletar a lista ${selection}?`}
            visible={visible}
            onOk={handleDelete}
            onCancel={() => { setVisible(false) }}
            okText="Confirmar"
            cancelText="Cancelar"
        >
            <p>Ao deletar a lista não sera possível restaurar</p>
        </Modal>
    )
}