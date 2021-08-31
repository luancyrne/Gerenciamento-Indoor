import Api from '../services/api';
import FormData from 'form-data';
import { message } from 'antd';

const form_data = new FormData();

const registerUser = (user) => {

    form_data.append('key', 'secret')
    form_data.append('nome', user.nome)
    form_data.append('senha', user.senha)
    form_data.append('loja', user.loja)

    if(user.nome === "" || user.senha === ""){
        Api.post('cad.php').then(response=>{
           message.warning(response.data.mensagem)
        })
    }else{
        Api.post('cad.php', form_data).then(response=>{
            message.success(response.data.mensagem)
        })
    }

}

export default registerUser;