import Api from "../../api";
const formData = new FormData()

const upScreen = (id, name, link, list_id, list_temp, rotation, store, dateStart, dateEnd) => {
    if (id) {
        formData.append('id', id);
    }
    if (name) {
        formData.append('name', name);
    }
    if (link) {
        formData.append('link', link);
    }
    if (list_id) {
        formData.append('listid', list_id);
    }
    if (rotation) {
        formData.append('rotation', rotation);
    }
    if (store) {
        formData.append('store', store)
    }
    if(list_temp){
        formData.append('list_temp', list_temp)
    }
    if(dateStart){
        formData.append('dateStart', dateStart)
    }
    if(dateEnd){
        formData.append('dateEnd', dateEnd)
    }





    return Api.request({ url: '/controllerScreen/upScreen.php', data: formData, method: 'POST' }).then(response => {
        return response.data
        
    }).catch(err => {
        console.log(err)
    })
}

export default upScreen;