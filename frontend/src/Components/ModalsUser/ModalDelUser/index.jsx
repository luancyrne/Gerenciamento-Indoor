import React from "react";
import { Modal } from "antd";
import delUser from "../../../Services/controller/users/delUser";
import { toast } from "react-toastify";

export const ModalDelUserCtx = React.createContext();

export class ModalDelUser extends React.Component {
    static contextType = ModalDelUserCtx
    
    handleDeleteUser = () => {
        delUser(this.context.selection).then(response => {
            toast(response.message, { theme: 'dark', type: response.type })
            this.context.setSelection(null)
            this.context.refresh()
            this.context.setVisible()
        }).catch(err => console.log(err))
    }

    componentWillUnmount(){
        this.context.setSelection(null)
    }

    render() {
        return (
            <Modal
                title={`Tem certeza que deja deletar o usuário ${this.context.selection} ?`}
                visible={this.context.visible}
                onOk={this.handleDeleteUser}
                onCancel={() => { this.context.setVisible() }}
                okText="Confirmar"
                cancelText="Cancelar"
            >
                <p>Ao deletar o usuário não sera possível restaurar</p>
            </Modal>
        )
    }
}