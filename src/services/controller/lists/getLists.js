import Api from "../../api";

export const getLists = async()=>{
    let access;
    if(localStorage.getItem('type') === 'admin'){
        return Api.request({url:`/controllerList/getList.php?lists`, method:"GET"}).then(response=>response.data).catch(err=>console.log(err))
    }else{
        access = localStorage.getItem('store');
        return Api.request({url:`/controllerList/getList.php?lists=${access}`, method:"GET"}).then(response=>response.data).catch(err=>console.log(err))
    }
    
}

export const getList = async(id)=>{
    let access;
    if(localStorage.getItem('type') === 'admin'){
        return Api.request({url:`/controllerList/getList.php?list&id=${id}&store`, method:"GET"}).then(response=>response.data).catch(err=>console.log(err))
    }else{
        access = localStorage.getItem('store');
        return Api.request({url:`/controllerList/getList.php?list&id=${id}&store=${access}`, method:"GET"}).then(response=>response.data).catch(err=>console.log(err))
    }
    
}