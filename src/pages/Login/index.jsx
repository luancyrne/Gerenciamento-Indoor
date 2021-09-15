import React from "react";
import '../../Styles/login.css';
import whiteLogo from '../../Assets/img/whiteLogo.png';
import getStoreGuest from "../../Services/controller/store/getStoreGuest";
import login from '../../Services/login';
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import { LoadingCnx, LoadingCnxCtx } from '../../Components/LodingCnx';
import store from "../../Store/authStore";
import {Checkbox } from 'antd'

const Login = () => {
    const [stores, setStores] = React.useState([]);
    const [loading, setLoading] = React.useState(true);
    const [message, setMessage] = React.useState('');
    const [adminCheck, setAdminCheck] = React.useState(false);
    const [disableCheck, setDisableCheck] = React.useState(false)
    const [userInfo, setUserinfo] = React.useState({
        name: '',
        password: '',
        store: ''
    })

    React.useEffect(() => {
        getStoreGuest().then(resolve => {
            if (resolve.type === 'warning') {
                toast(resolve.message, { type: resolve.type, theme: 'dark' })
                setMessage(resolve.message);
            } else {
                setStores(resolve)
                setLoading(false)
            }
        }).catch(error => {
            toast('Falha ao se conectar com a API', { theme: 'dark', type: 'error' });
            setMessage('...Falha ao conectar com o sistema - Reinicie a pagina...');
        })
    }, [])

    const handleInputs = (e) => {
        setUserinfo({ ...userInfo, [e.target.name]: e.target.value })
    }

    const handleSubmit = () => {
        setLoading(true)
        login(userInfo.name, userInfo.password, userInfo.store, adminCheck).then(resolve => {
            if (resolve.type) {
                toast(resolve.message, { type: resolve.type, theme: 'dark' })
            }
            if (resolve.infos.token) {
                store.dispatch({
                    'type': 'authenticated',
                    'state': {
                        user: resolve.infos.user,
                        store: resolve.infos.store,
                        type: resolve.infos.type,
                        token: resolve.infos.token,
                        id: resolve.infos.id,
                        authenticated: true
                    }
                })
                window.location.reload()
            }
            setLoading(false)
        }).catch(reject => {
            setLoading(false)
        })
    }
    
    const handleCheckAdmin = ()=>{
        setAdminCheck(!adminCheck);
        setDisableCheck(!disableCheck);
    }


    return (
        <main className='MainLogin'>
            {
                loading
                    ? <LoadingCnxCtx.Provider value={{ message }}><LoadingCnx /></LoadingCnxCtx.Provider>
                    : <>
                        <ToastContainer />
                        <section className='MainCenter'>
                            <div className='Logo'>
                                <img src={whiteLogo} alt="CNX Telecom - Você sempre conectado!" />
                            </div>
                            <div className='FormLogin'>
                                <label className='fontgroup'>Usuário:</label>
                                <input name='name' onChange={handleInputs} value={userInfo.name} className='inputgroup' spellCheck='false' type="text" />
                                <label className='fontgroup'>Senha:</label>
                                <input name='password' onChange={handleInputs} value={userInfo.password} className='inputgroup' spellCheck='false' type='password' />
                                <Checkbox style={{color:'#fff', margin:'10px'}} onClick={handleCheckAdmin}>Administrador</Checkbox>
                                <label className='fontgroup' >Selecione a Loja:</label>
                                <select disabled={disableCheck} onChange={handleInputs} spellCheck='false' name="store" id="selectgroup" value={userInfo.store}>
                                    <option value=" " defaultChecked></option>
                                    {

                                        stores.map((item) => {
                                            return (
                                                <option className='optiongroup' key={item.id} spellCheck='false' value={item.name}>{item.name}</option>
                                            )
                                        })

                                    }
                                </select>
                                <button onClick={handleSubmit}>Entrar</button>
                            </div>
                        </section>
                        <label className='Footer'>Desenvolvido por © CNX Telecom</label>
                    </>
            }
        </main>
    )
}

export default Login;