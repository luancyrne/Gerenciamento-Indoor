import Api from "../../api";
const formData = new FormData();

const cadUser = (name, password, store, type)=>{
    formData.append('name', name)
    formData.append('password', password)
    formData.append('store', store)
    formData.append('type', type)
    
    return Api.request({url:'/controllerUser/cadUser.php', method:'POST', data:formData}).then(response=>response.data).catch(err=>console.log(err))
}

export default cadUser;