import Api from "../../api";
const formData = new FormData();

const cadContents = (name, file, list)=>{
    if(name){
        formData.append('name', name)
    }
    if(file){
        formData.append('file', file, file)
    }
    if(list){
        formData.append('list', list)
    }
    return Api.request({url:'/controllerContents/cadContent.php', method:'POST', data:formData}).then(response=>response.data).catch(err=>{
        console.log(err)
    })
}

export default cadContents