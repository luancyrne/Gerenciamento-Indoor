import Api from '../../api';
import store from '../../../Store/authStore';

export const getScreens = async()=>{
    let storeGet = '';
    let screens;
    await store.getState().then(item=>{
        if(localStorage.getItem('type') === 'admin'){
            return null
        }else{
            storeGet = item.store
        }
    })
    await Api.request({url:`/controllerScreen/getScreen.php?screens=${storeGet}`, method:'GET'}).then(response=>screens = response.data).catch(err=>console.log(err))
    return screens
}

export const getScreen = async(id)=>{
    let screen;
    await Api.request({url:`/controllerScreen/getScreen.php?screen&id=${id}`, method:'GET'}).then(response=>screen = response.data).catch(err=>console.log(err))
    return screen
}