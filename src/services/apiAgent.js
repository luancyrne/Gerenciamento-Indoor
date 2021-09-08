import request from 'superagent';

const host = 'http://indoor.lcprojects.net/api/'

const ApiAgent = (param)=>{
    request.post(`${host}api.php`).set('Content-Type', 'application/x-www-form-urlencoded').send({ key: "secret", query: param }).end((err, res) => {
        if (err) {
            return (
                console.log('Falha ao carregar daddos')
            )
        } else {
            return (
                console.log(res.text)
            )
        }
    })
}

export default ApiAgent;