import React from "react";
import '../../Styles/login.css';
import whiteLogo from '../../Assets/img/whiteLogo.png';
import getStoreGuest from "../../Services/controller/store/getStoreGuest";
import login from '../../Services/login';
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import { LoadingCnx, LoadingCnxCtx } from '../../Components/LodingCnx';
import store from "../../Store/authStore";
import { Checkbox } from 'antd'

export class Login extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            stores: [],
            loading: true,
            message: '',
            adminCheck: false,
            disableCheck: false,
            userInfo: {
                name: '',
                password: '',
                store: ''
            }
        }
    }

    componentDidMount() {
        getStoreGuest().then(resolve => {
            if (resolve.type === 'warning') {
                toast(resolve.message, { type: resolve.type, theme: 'dark' })
                this.setState({ message: resolve.message })
            } else {
                this.setState({ stores: resolve })
                this.setState({ loading: false })
            }
        }).catch(error => {
            toast('Falha ao se conectar com a API', { theme: 'dark', type: 'error' });
            this.setState({ message: '...Falha ao conectar com o sistema - Reinicie a pagina...' })
        })
    }

    handleInputs = (e) => {
        this.setState({ userInfo: { ...this.state.userInfo, [e.target.name]: e.target.value } })
    }

    handleSubmit = () => {
        this.setState({ loading: true })
        login(this.state.userInfo.name, this.state.userInfo.password, this.state.userInfo.store, this.state.adminCheck).then(resolve => {
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
            this.setState({ loading: false })
        }).catch(reject => {
            this.setState({ loading: false })
        })
    }

    handleCheckAdmin = () => {
        this.setState({ adminCheck: !this.state.adminCheck })
        this.setState({ disableCheck: !this.state.disableCheck })
    }

    render() {
        return (
            <main className='MainLogin'>
                {
                    this.state.loading
                        ? <LoadingCnxCtx.Provider value={{ message:this.state.message }}><LoadingCnx /></LoadingCnxCtx.Provider>
                        : <>
                            <ToastContainer />
                            <section className='MainCenter'>
                                <div className='Logo'>
                                    <img src={whiteLogo} alt="CNX Telecom - Você sempre conectado!" />
                                </div>
                                <div className='FormLogin'>
                                    <label className='fontgroup'>Usuário:</label>
                                    <input name='name' onChange={this.handleInputs} value={this.state.userInfo.name} className='inputgroup' spellCheck='false' type="text" />
                                    <label className='fontgroup'>Senha:</label>
                                    <input name='password' onChange={this.handleInputs} value={this.state.userInfo.password} className='inputgroup' spellCheck='false' type='password' />
                                    <Checkbox style={{ color: '#fff', margin: '10px' }} onClick={this.handleCheckAdmin}>Administrador</Checkbox>
                                    <label className='fontgroup' >Selecione a Loja:</label>
                                    <select disabled={this.state.disableCheck} onChange={this.handleInputs} spellCheck='false' name="store" id="selectgroup" value={this.state.userInfo.store}>
                                        <option value=" " defaultChecked></option>
                                        {

                                            this.state.stores.map((item) => {
                                                return (
                                                    <option className='optiongroup' key={item.id} spellCheck='false' value={item.name}>{item.name}</option>
                                                )
                                            })

                                        }
                                    </select>
                                    <button onClick={this.handleSubmit}>Entrar</button>
                                </div>
                            </section>
                            <label className='Footer'>Desenvolvido por © CNX Telecom</label>
                        </>
                }
            </main>
        )
    }
}

export default Login;