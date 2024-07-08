import Api from "../../api";
const formData = new FormData()

const delList = (id)=>{
    formData.append('id', id)
    return Api.request({url:'/controllerList/delList.php', method:'POST', data:formData}).then(response=>response.data).catch(err=>console.log(err))
}

export default delList