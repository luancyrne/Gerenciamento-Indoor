import React from "react";
import { Modal } from "antd";
import delUser from "../../../Services/controller/users/delUser";
import { toast } from "react-toastify";

export const ModalDelUserCtx = React.createContext();

export const ModalDelUser = () => {

    const { visible, setVisible, selection, setSelection, refresh } = React.useContext(ModalDelUserCtx)

    const handleDeleteUser = () => {
        delUser(selection).then(response => {
            toast(response.message, { theme: 'dark', type: response.type })
            setSelection(null)
            refresh()
            setVisible(false)
        }).catch(err => console.log(err))
    }

    return (

        <Modal
            title={`Tem certeza que deja deletar o usuário ${selection} ?`}
            visible={visible}
            onOk={handleDeleteUser}
            onCancel={() => { setVisible(false) }}
            okText="Confirmar"
            cancelText="Cancelar"
        >
            <p>Ao deletar o usuário não sera possível restaurar</p>
        </Modal>
    )
}