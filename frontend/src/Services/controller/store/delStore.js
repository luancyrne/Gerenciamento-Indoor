import Api from "../../api";
const formData = new FormData();

const delStore = (id)=>{
    formData.append('id', id)
    return Api.request({url:'/controllerStore/delStore.php', method:'POST', data:formData}).then(response=>response.data).catch(err=>console.log(err))
}

export default delStore;