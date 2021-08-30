import React from 'react';
import whiteLogo from '../../styles/images/whiteLogo.png';
import { Typography } from 'antd';
import { InputText } from 'primereact/inputtext';
import { Password } from 'primereact/password';
import { Button } from 'primereact/button';
import { ScrollPanel } from 'primereact/scrollpanel'
import 'primereact/resources/themes/saga-blue/theme.css'
import 'primereact/resources/primereact.min.css'
import 'antd/dist/antd.css'
import '../../styles/css/Login.css'

const { Title, Text } = Typography

const style = {
    main: {
        display: 'flex',
        height: '100%',
        width: '100%',
        background: 'linear-gradient(90deg, rgb(255, 119, 59) 0%, rgb(255, 142, 36) 35%, rgb(255, 84, 67) 100%)'
    },
    divInfo: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'column',
        height: '100%',
        width: '100%'
    },
    sectionInfo: {
        height: '100%',
        width: '100%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'column',
        color: '#ffffff'
    },
    sectionLogin: {
        height: '10%',
        width: '100%',
        display: 'flex',
        justifyContent: 'space-between'
    },
    input: {
        width: '250px',
        height: '29px',
        marginTop: '40px',
        marginRight: '10px',
        marginLeft: '10px'
    }
}

const Login = () => {
    return (
        <main style={style.main}>
            <div style={style.divInfo}>
                <section style={style.sectionLogin}>
                    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                        <img src={whiteLogo} style={{ marginTop: '8px', height: '75px', width: '150px', marginLeft: '20px' }} alt="CNX Telecom - você sempre conectado!" />
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', marginRight: '20px' }}>
                        <InputText className='raised' placeholder='Usuário' style={style.input}></InputText>
                        <Password className='raised' placeholder='Senha' style={{ width: '193px', height: '29px', marginTop: '40px', marginRight: '19px', marginLeft: '10px' }} feedback={false}/>
                        <Button style={{ marginTop: '40px', height: '29px' }} className='p-button-raised p-button-warning'>Entrar</Button>
                    </div>

                </section>
                <section style={style.sectionInfo}>
                    <ScrollPanel style={{ height: '100%', width: '100%' }}>
                        <div style={{ height: '100%', width: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
                            <Title className='textAnim' style={{ color: '#fff' }}>Gerencie o conteúdo que sera mostrado a seus clientes</Title>
                            <p style={{ width: '50%', textAlign: 'center' }} >
                                <Text className='textAnim'style={{color:'#fff'}} strong >Organize suas lojas por tela</Text><br/>
                                <Text className='textAnim' style={{color:'#fff'}} strong >Controle o conteúdo que sera exibido</Text><br/>
                                <Text className='textAnim' style={{color:'#fff'}} strong >Faça o upload dos conteúdos</Text><br/>
                                <Text className='textAnim' style={{color:'#fff'}} strong >Escolha o tempo de reprodução</Text><br/>
                                <Text className='textAnim' style={{color:'#fff'}} strong  >Escolha o formato e posicionamento de seus conteúdos</Text><br/>
                            </p>
                        </div>
                    </ScrollPanel>
                </section>
            </div>
        </main>
    )
}

export default Login