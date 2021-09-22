import React from "react";
import {Modal} from 'antd';
import delContent from "../../../Services/controller/contents/delContents";
import { toast } from "react-toastify";

export const ModalDelContentCtx = React.createContext();

export class ModalDelContent extends React.Component{
    static contextType = ModalDelContentCtx

    handleDelete = ()=>{
        delContent(this.context.contentIdSelection).then(response=>{
            toast(response.message, {theme:'dark', type:response.type})
            if(response.type === 'success'){
                this.context.setVisibleDelContent()
                this.context.accordionSelect()
            }
        }).catch(err=>{
            console.log(err)
        })
    }

    render(){
        return (
            <Modal 
                title="Deletar conteúdo?"
                visible={this.context.visibleDelContent}
                onCancel={this.context.setVisibleDelContent}
                cancelText="Cancelar"
                okText="Confirmar"
                onOk={this.handleDelete}
            >
                <label>Após a confirmação a ação não podera ser restaurada</label>
            </Modal>
        )
    }
}