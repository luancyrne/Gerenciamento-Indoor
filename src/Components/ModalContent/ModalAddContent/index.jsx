import React from "react";
import { Modal, Input, Spin } from "antd";
import cadContents from '../../../Services/controller/contents/cadContents';
import { toast } from "react-toastify";
// import Api from "../../../Services/api";


export const ModalAddContentCtx = React.createContext();

export class ModalAddContent extends React.Component {
    static contextType = ModalAddContentCtx
    constructor(props) {
        super(props)
        this.state = {
            file: undefined,
            name: '',
            loading: false
        }
    }

    handleUpload = () => {
        this.setState({ loading: !this.state.loading })
        cadContents(this.state.name, this.state.file, this.context.list).then(response => {
            toast(response.message, { theme: 'dark', type: response.type })
            this.setState({ loading: !this.state.loading })
            if(response.type === 'success'){
                this.context.setVisibleAddContent()
            }
        }).catch(err => {
            console.log(err)
        })
    }

    handleUpfile = (e) => {
        this.setState({ file: e.target.files[0] })
    }

    handleNameChange = (e) => {
        this.setState({ name: e.target.value })
    }


    render() {
        return (
            <Modal
                title="Adicionar conteúdo"
                visible={this.context.visibleAddContent}
                onCancel={this.context.setVisibleAddContent}
                okText="Confirmar"
                cancelText="Cancelar"
                onOk={this.handleUpload}
            >
                <Spin spinning={this.state.loading} tip="Enviando arquivo, aguarde um momento">
                    <Input onChange={this.handleNameChange} placeholder="Nome que sera salvo" style={{ marginBottom: '10px' }}></Input>
                    <input type="file" onChange={this.handleUpfile} />
                </Spin>
            </Modal>
        )
    }
}