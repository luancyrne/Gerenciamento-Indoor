import { Modal } from "antd";
import React from "react";
import { toast } from "react-toastify";
import delList from "../../../Services/controller/lists/delList";

export const ModalDelListCtx = React.createContext();

export class ModalDelList extends React.Component {
    static contextType = ModalDelListCtx

    handleDelete = ()=>{
        delList(this.context.selection).then(response => {
            toast(response.message, { theme: 'dark', type: response.type })
            if (response.type === 'success') {
                this.context.setVisible(false)
                this.context.setSelection(null)
                this.context.refresh()
            }
        }).catch(err => {
            console.log(err)
        })
    }

    render() {
        return (
            <Modal
                title={`Deseja deletar a lista ${this.context.selection}?`}
                visible={this.context.visible}
                onOk={this.handleDelete}
                onCancel={() => { this.context.setVisible(false) }}
                okText="Confirmar"
                cancelText="Cancelar"
            >
                <p>Ao deletar a lista não sera possível restaurar</p>
            </Modal>
        )
    }
}