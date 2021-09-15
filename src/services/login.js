import Api from "./api";
const formData = new FormData();

const login = (name, password, store, adminCheck) => {
    if (name) {
        formData.append('name', name);
    }
    if (password) {
        formData.append('password', password);
    }
    if(adminCheck === true){
        formData.append('admin', adminCheck);
    }else{
        formData.append('store', store)
    }

    const options = {
        method: 'POST',
        url: 'login.php',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        data: formData
    };

    return new Promise((resolve, reject) => {
        Api.request(options).then(response => {
            console.log(response.data)
            resolve(response.data)
        }).catch(err => {
            reject(err)
        })
    })
}

export default login;