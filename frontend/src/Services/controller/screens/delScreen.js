import Api from "../../api";
const formData = new FormData();

const delScreen = (id)=>{
    formData.append('id', id)
    return Api.request({url:'/controllerScreen/delScreen.php', method:'POST', data:formData}).then(response=>response.data).catch(err=>console.log(err))
}

export default delScreen;