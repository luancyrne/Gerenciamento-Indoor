import React from 'react';
import LayoutMaster from '../../components/layout/index';
import { Typography, Select, Input, Spin, Button } from 'antd';
import { UserOutlined } from '@ant-design/icons';
import { RiLockPasswordLine } from 'react-icons/ri';
import Api from '../../services/api';
import registerUser from '../../services/register';

const { Text } = Typography;

const form_data = new FormData()
form_data.append('key', 'secret')
form_data.append('query', 'SELECT * FROM lojas')


const Register = () => {
    const [lojas, setLojas] = React.useState([{ id: 0, loja: 'Não a lojas cadastradas' }]);
    const [loading, setLoading] = React.useState(true);
    const [user, setUser] = React.useState({
        nome: '',
        senha: '',
        loja: []
    })

    React.useEffect(() => {
        Api.post('api.php', form_data).then(response => {
            if (response.data === '') {
                setLoading(false)
                return null
            } else {
                setLojas(response.data)
            }
            setLoading(false)
        })
    }, [])

    const handleUser = (e) => {
        setUser({...user, [e.target.name]: e.target.value})
    }

    const handleSelect = (e, event)=>{
        setUser({...user, 'loja': e})
    }

    const handleSubmit = () => {
        registerUser(user)
    }

    return (
        <LayoutMaster>
            <div style={{ width: '100%', height: '100%', display: 'flex', flexDirection: 'column', alignContent:'center', alignItems:'center' }}>

                <Text strong>Usuário:</Text>
                <Input onChange={handleUser} value={user.nome} name='nome' size="large" style={{ width: '500px' }} placeholder="Nome do usuário" prefix={<UserOutlined />} />
                <br />
                <Text strong>Senha:</Text>
                <Input.Password onChange={handleUser} value={user.senha} name='senha' size="large" style={{ width: '500px' }} placeholder="Senha" prefix={<RiLockPasswordLine />} />
                <br />
                <Text strong>Selecione as lojas que serão gerenciadas por este usuário:</Text>
                {
                    loading ? <Spin style={{ color: '#fff' }} tip='Carregando...'></Spin> :
                        <Select
                            mode="multiple"
                            placeholder={lojas[0].loja === 'Não a lojas cadastradas' ? 'Não a lojas cadastradas' : 'Selecione a loja'}
                            style={{ width: '500px' }}
                            disabled={lojas[0].loja === 'Não a lojas cadastradas' ? true : false}
                            onChange={handleSelect}
                            name='loja'

                        >
                            {
                                lojas.map(item => {
                                    return (
                                        <Select.Option name='loja' key={item.id} value={item.loja}>{item.loja}</Select.Option>
                                    )
                                })
                            }
                        </Select>
                }
                <br />
                <div style={{ display: 'flex', justifyContent: 'space-between', width: '500px' }}>
                    <Button type='primary' danger>Cancelar</Button>
                    <Button type='primary' onClick={handleSubmit}>Cadastrar</Button>
                </div>
            </div>
        </LayoutMaster>
    )
}

export default Register;