import Api from "../../api";
const formData = new FormData();

const cadStore = (name)=>{
    formData.append('name', name);
    return Api.request({url:'/controllerStore/cadStore.php', method:'POST', data:formData}).then(response=>response.data).catch(err=>console.log(err))
}

export default cadStore;