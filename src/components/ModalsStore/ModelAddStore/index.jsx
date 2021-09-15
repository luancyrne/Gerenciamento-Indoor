import React from 'react';
import { Modal, Input } from 'antd';
import { toast } from 'react-toastify';
import cadStore from '../../../Services/controller/store/cadStore';

export const ModelAddStoreCtx = React.createContext();

export const ModalAddStore = () => {

    const {visibleAdd, setVisibleAdd, refresh} = React.useContext(ModelAddStoreCtx);
    const [name, setName] = React.useState('');

    const handleCad = ()=>{
        cadStore(name).then(response=>{
            toast(response.message, {theme:'dark', type:response.type})
            if(response.type === 'success'){
                setVisibleAdd(false)
            }
            refresh()
        }).catch(err=>{
            console.log(err)
        })
    }

    return (
        <Modal
            title={`Adicionar loja`}
            visible={visibleAdd}
            onOk={handleCad}
            onCancel={()=>{setVisibleAdd(false)}}
            okText="Confirmar"
            cancelText="Cancelar"
        >
           <Input placeholder="Digite o nome da loja" onChange={(e)=>{setName(e.target.value)}}></Input>
        </Modal>
    )
}