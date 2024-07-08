import React from 'react';
import { Modal } from 'antd';
import delScreen from '../../../Services/controller/screens/delScreen';
import { toast } from 'react-toastify';

export const ModalDelScreenCtx = React.createContext()

export class ModalDelScreen extends React.Component {
    static contextType = ModalDelScreenCtx
    
    handleDeleteScreen = () => {
        delScreen(this.context.selection).then(response => {
            toast(response.message, { theme: 'dark', type: response.type })
            this.context.refresh()
            this.context.setSelection(null)
            this.context.setVisible()
        })
    }

    handleCancel = () => {
        this.context.setVisible(false)
        this.context.setSelection(null)
    }


    render() {
        return (
            
            <Modal
                title={`Tem certeza que deja deletar a tela ${this.context.selection} ?`}
                visible={this.context.visible}
                onOk={this.handleDeleteScreen}
                onCancel={this.handleCancel}
                okText="Confirmar"
                cancelText="Cancelar"
            >

                <p>Ao deletar a tela não sera possível restaurar</p>
            </Modal>

        )
    }

}