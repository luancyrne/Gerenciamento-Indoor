import Api from "../../api";
const formData = new FormData()

const cadScreen = (name, link, list_id, rotation, store)=>{
    formData.append('name', name);
    formData.append('link', link);
    formData.append('list_id', list_id);
    formData.append('rotation', rotation);
    formData.append('store', store)
    return Api.request({url:'/controllerScreen/cadScreen.php', data:formData, method:'POST'}).then(response=>response.data).catch(err=>{
        console.log(err)
    })
}

export default cadScreen;