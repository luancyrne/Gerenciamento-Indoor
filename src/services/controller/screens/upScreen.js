import Api from "../../api";
const formData = new FormData()

const upScreen = (id, name, link, list_id, rotation, store)=>{
    if(id){
        formData.append('id', id);
    }
    if(name){
        formData.append('name', name);
    }
    if(link){
        formData.append('link', link);
    }
    if(list_id){
        formData.append('listid', list_id);
    }
    if(rotation){
        formData.append('rotation', rotation);
    }
    if(store){
        formData.append('store', store)
    }
    
    
    
    
    
    return Api.request({url:'/controllerScreen/upScreen.php', data:formData, method:'POST'}).then(response=>response.data).catch(err=>{
        console.log(err)
    })
}

export default upScreen;