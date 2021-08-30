import React from 'react';
import CardStore from '../../components/Card';
import { Typography, Spin } from 'antd';
import 'antd/dist/antd.css';
import Api from '../../services/api';
import FormData from 'form-data';

const { Title } = Typography

const form_data = new FormData()
form_data.append('key', 'secret')
form_data.append('query', 'SELECT * FROM lojas')



const StoresSelect = () => {
    const [lojas, setLojas] = React.useState([{id:0, loja:'Não a lojas cadastradas'}])
    const [loading, setLoading] = React.useState(true)

    React.useEffect(() => {
        Api.post('api.php', form_data).then(response => {
            if(response.data === ''){
                setLoading(false)
                return null
            }else{
            setLojas(response.data)
            }
            setLoading(false)
        })
    }, [])

    return (
        <>

            <main style={{ display: 'flex', width: '100%', height: '100%', alignItems: 'center', justifyContent: 'center', flexDirection: 'column', background: 'linear-gradient(90deg, rgba(255,119,59,1) 0%, rgba(255,142,36,1) 35%, rgba(255,84,67,1) 100%)' }}>
                    <div style={{ marginBottom: '50px' }}>
                        <Title className='textAnim' style={{ color: '#fff', fontSize: '25px' }}>Selecione a loja que deseja gerenciar</Title>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center' }}>
                        {
                            loading ? <Spin style={{color:'#fff'}} tip='Carregando...'></Spin>:
                            lojas.map(items => {
                                return (<CardStore key={items.id} title={items.loja}></CardStore>)
                            })
                        }
                    </div>
            </main>

        </>
    )
}

export default StoresSelect;