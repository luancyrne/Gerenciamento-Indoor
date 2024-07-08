import Api from "../../api";
const formData = new FormData();


const delUser = (id)=>{
    formData.append('id', id);
    return Api.request({url:'/controllerUser/delUser.php', method:'POST', data:formData}).then(response=>response.data).catch(err=>{
        console.log(err)
    })
}

export default delUser