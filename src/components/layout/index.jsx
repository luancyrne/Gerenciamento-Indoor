import React from 'react';
import '../../Styles/layout.css';
import whiteLogo from '../../Assets/img/whiteLogo.png'
import { Avatar, Dropdown, Menu, Button } from 'antd';
import { AiOutlineUser } from 'react-icons/ai/index';
import 'antd/dist/antd.css';
import { IoTvSharp, IoSettings } from 'react-icons/io5';
import { FaListAlt, FaStore, FaUsers } from 'react-icons/fa';
import { AiFillFile } from 'react-icons/ai';
import { useNavigate } from 'react-router';
import { ModalEditUserCtx, ModalEditUser } from '../ModalsUser/ModalEditUser';

const { SubMenu } = Menu;

const Layout = (props)=> {
  const [visibleEdit, setVisibleEdit] = React.useState(false);
  const [selection, setSelection] = React.useState(0);
  const navigate = useNavigate();

  const refresh = ()=>{
    return null
  }

  const handleEditUser = ()=>{
    setSelection(localStorage.getItem('id'))
    setVisibleEdit(true)
  }



  const menu = (
    <Menu>
      <Menu.Item key='1'>
        <Button onClick={handleEditUser} type='primary'>Perfil</Button>
      </Menu.Item>
      <Menu.Item key='2'>
        <Button onClick={() => {
          localStorage.clear()
          window.location.reload()
        }} danger type='primary'>Sair</Button>
      </Menu.Item>
    </Menu>
  );

  return (
    <>
      <ModalEditUserCtx.Provider value={{ visibleEdit, setVisibleEdit, selection, refresh}}>
        <ModalEditUser />
      </ModalEditUserCtx.Provider>
      <header className='navigator' style={{ height: '60px' }}>
        <div className='menunavigate'>
          <img src={whiteLogo} alt="CNX Telecom - Você sempre conectado" />
        </div>
        <div className='menunavigate' style={{ display: 'flex', justifyContent: 'flex-end' }}>
          <Dropdown overlay={menu} placement="bottomCenter" arrow>
            <Avatar style={{ marginRight: '39px', cursor: 'pointer' }} shape="square" size="large" icon={<AiOutlineUser />} />
          </Dropdown>
        </div>
      </header>
      <section className='content'>
        <div>
          <Menu style={{ display: 'flex', justifyContent: 'center' }} mode="horizontal">
            <Menu.Item onClick={() => { navigate('/dashboard') }} key="TVs" icon={<IoTvSharp />}>
              TVs
            </Menu.Item>
            <Menu.Item key="List" onClick={()=>{navigate('/list')}} icon={<FaListAlt />}>
              Lista de conteúdos
            </Menu.Item>
            <Menu.Item key="Contents" onClick={()=>{navigate('/content')}} icon={<AiFillFile />}>
              Conteúdos
            </Menu.Item>
            {
              localStorage.getItem('type') === 'admin' ? <SubMenu key="Tools" icon={<IoSettings />} title="Ferramentas">
                <Menu.Item key="users" onClick={()=>navigate('/users')} icon={<FaUsers />}>Usuários</Menu.Item>
                <Menu.Item key="stores" onClick={() => { navigate('/stores') }} icon={<FaStore />}>Lojas</Menu.Item>
              </SubMenu> : null
            }
          </Menu>
        </div>
        <div style={{ height: '100%' }}>
          {props.children}
        </div>
      </section>

    </>
  )
}

export default Layout;