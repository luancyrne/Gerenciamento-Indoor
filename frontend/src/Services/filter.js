import Api from './api';
const formData = new FormData()

const filter = async (filter, search, table) => {

    let screens;
    let access = localStorage.getItem('type')
    let store = localStorage.getItem('store');

    if (access === 'admin') {
        let queryInject = `${filter} LIKE '%${search}%'`;
        let query = `SELECT * FROM ${table} WHERE ${queryInject}`;
        formData.append('query', query);
        await Api.request({ url: `/filter.php`, method: 'POST', data: formData }).then(response => screens = response.data).catch(err => console.log(err))
    } else {
        let queryInject = `${filter} LIKE '%${search}%' AND store = '${store}'`;
        let query = `SELECT * FROM ${table} WHERE ${queryInject}`;
        formData.append('query', query);
        await Api.request({ url: `/filter.php`, method: 'POST', data: formData }).then(response => screens = response.data).catch(err => console.log(err))
    }
    return screens
}

export default filter;