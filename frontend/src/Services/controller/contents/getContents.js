import Api from "../../api";

const getContents = (listid)=>{
    return Api.request({url:`/controllerContents/getContent.php?contents=${listid}`, method:'GET', data:listid}).then(response=>response.data).catch(err=>{
        console.log(err)
    })
}

export default getContents