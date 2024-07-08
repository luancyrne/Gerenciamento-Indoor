import Api from "../../api";

const options = {
    method: 'GET',
    url: 'controllerStore/getStoreGuest.php',
    params: { token: '64EFE0FDBB5AE140C69C221D70A4D2949733DEEF1F2EE4DB1119A3C89C39CC4F' },
};

const getStoreGuest = () => {
    return new Promise((resolve, reject) => {
        Api.request(options).then(function (response) {
            resolve(response.data)
        }).catch(function (error) {
            reject(error)
        });
    })
}

export default getStoreGuest;