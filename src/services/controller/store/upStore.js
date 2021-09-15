import Api from "../../api";
const formData = new FormData();


const upStore = async (id, name)=>{
    formData.append('id', id);
    formData.append('name', name);
    return Api.request({url:'/controllerStore/upStore.php', method:'POST', data:formData}).then(response=>response.data).catch(err=>{
        console.log(err)
    })
}

export default upStore