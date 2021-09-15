import Api from "../../api";
const formData = new FormData();

const upUser = (id, name, password, store, type)=>{
    if(id){
        formData.append('id', id)
    }

    if(name){
        formData.append('name', name)
    }

    if(password){
        formData.append('password', password)
    }

    if(store){
        formData.append('store', store)
    }

    if(type){
        formData.append('type', type)
    }

    return Api.request({url:'/controllerUser/upUser.php', method:'POST', data:formData}).then(response=>response.data).catch(err=>console.log(err))
}

export default upUser;