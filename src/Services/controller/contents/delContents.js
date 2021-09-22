import Api from "../../api";

const formData = new FormData()

const delContent = (id)=>{
    formData.append('id', id)
    return Api.request({url:'/controllerContents/delContent.php', method:'POST', data:formData}).then(response=>response.data).catch(err=>console.log(err))
}

export default delContent