import Api from "../../api";
const formData = new FormData();

const cadList = (name, store) => {

    formData.append('name', name)


    formData.append('store', store)


    return Api.request({ url: '/controllerList/cadList.php', method: 'POST', data: formData }).then(response => response.data).catch(err => console.log(err))
}

export default cadList