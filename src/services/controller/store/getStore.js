import Api from "../../api";

export const getStores = async()=>{
    let screens
    await Api.request({url:'/controllerStore/getStore.php?stores', method:"GET"}).then(response=>screens = response.data).catch(err=>console.log(err))
    return screens
}
