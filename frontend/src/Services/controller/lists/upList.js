import Api from "../../api";
const formData = new FormData()

const upList = (id, name, store) => {
    formData.append('id', id)
    formData.append('name', name)
    if (store === '' || store === null) {
        formData.append('store', localStorage.getItem('store'))
    } else {
        formData.append('store', store)
    }

    return Api.request({ url: '/controllerList/upList.php', method: 'POST', data: formData }).then(response => response.data).catch(err => {
        console.log(err)
    })
}

export default upList