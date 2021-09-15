import Api from "../../api";

const getLists = async()=>{
    return Api.request({url:'/controllerList/getList.php?lists', method:"GET"}).then(response=>response.data).catch(err=>console.log(err))
}

export default getLists