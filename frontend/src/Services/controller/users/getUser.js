import Api from "../../api";

export const getUser = (id) => {
    return Api.request({url:`/controllerUser/getUser.php?user&id=${id}`}).then(response=>response.data).catch(err=>console.log(err))
}

export const getUsers = () => {
    return Api.request({url:`/controllerUser/getUser.php?users`}).then(response=>response.data).catch(err=>console.log(err))
}