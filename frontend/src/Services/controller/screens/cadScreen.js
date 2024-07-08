import Api from "../../api";
const formData = new FormData()

const cadScreen = (name, link, list_id, list_temp, rotation, store, dateStart, dateEnd)=>{
    formData.append('name', name);
    formData.append('link', link);
    formData.append('list_id', list_id);
    formData.append('list_temp', list_temp);
    formData.append('rotation', rotation);
    formData.append('store', store);
    formData.append('dateStart', dateStart);
    formData.append('dateEnd', dateEnd);
    return Api.request({url:'/controllerScreen/cadScreen.php', data:formData, method:'POST'}).then(response=>response.data).catch(err=>{
        console.log(err)
    })
}

export default cadScreen;