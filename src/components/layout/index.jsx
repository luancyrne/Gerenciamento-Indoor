import React from 'react';
import 'primereact/resources/themes/saga-blue/theme.css';
import 'primereact/resources/primereact.min.css';
import '../../styles/css/layout.css';
import 'antd/dist/antd.css';
import whiteLogo from '../../styles/images/whiteLogo.png';
import { Layout, Breadcrumb, Dropdown, Menu, Avatar } from 'antd';
import { IoTvSharp, IoImages } from 'react-icons/io5'
import { FaThList, FaUserAlt } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

const { Content, Footer } = Layout;

const link = ' '

const menu = (
    <Menu>
        <Menu.Item key='1'>
            <a href={link}>
                Perfil
            </a>
        </Menu.Item>
        <Menu.Item key='2' style={{ color: 'red' }}>
            <a href={link}>
                Sair
            </a>
        </Menu.Item>
    </Menu>
);

const LayoutMaster = (props) => {
    const navigate = useNavigate()

    return (
        <Layout style={{ height: '100%' }}>
            <header style={{ height: 64, background: 'linear-gradient(180deg, rgba(251,116,61,1) 28%, rgba(251,132,45,1) 77%)', padding: '0 50px', marginBottom: '50px', boxShadow: '5px 5px 24px 5px #000000', display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
                <div>
                    <img onClick={()=>{navigate('/dashboard')}} src={whiteLogo} alt="CNX Telecom - Você sempre conectado!" style={{ width: '100px', cursor:'pointer' }} />
                </div>
                <div style={{ height: '100%', display: 'flex' }}>
                    <button>
                        <IoTvSharp style={{ fontSize: 20, marginBottom: '-4px', marginRight: '5px' }} />TV
                    </button>
                    <button>
                        <IoImages style={{ fontSize: 20, marginBottom: '-4px', marginRight: '5px' }} />Arquivos
                    </button>
                    <button>
                        <FaThList style={{ fontSize: 20, marginBottom: '-4px', marginRight: '5px' }} />Lista de reprodução
                    </button>
                </div>
                <div style={{ height: '100%', display: 'flex', alignItems: 'center' }}>
                    <Dropdown overlay={menu}>
                        <a href={link} className="ant-dropdown-link" onClick={e => e.preventDefault()}>
                            <Avatar shape="square" size={40} icon={<FaUserAlt />} />
                        </a>
                    </Dropdown>
                </div>
            </header>
            <Content style={{ padding: '0 50px' }}>
                <Breadcrumb style={{ margin: '16px 0' }}>

                </Breadcrumb>
                <Layout className="site-layout-background" style={{ padding: '24px 0' }}>
                    <Content style={{ padding: '0 24px', minHeight: 280 }}>{props.children}</Content>
                </Layout>
            </Content>
            <Footer style={{ textAlign: 'center' }}>CNX Indoor System ©2021 Criado por CNX Telecom</Footer>
        </Layout>
    )
}

export default LayoutMaster;