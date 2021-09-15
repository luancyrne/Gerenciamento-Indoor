import { createStore } from 'redux';



const getToken = async() => {
    if (localStorage.getItem('token')) {
        return {
            user: localStorage.getItem('user'),
            store: localStorage.getItem('store'),
            type: localStorage.getItem('type'),
            token: localStorage.getItem('token'),
            id: localStorage.getItem('id'),
            authenticated: true
        }

    } else {
        return {
            user: '',
            store: '',
            type: '',
            token: '',
            id:'',
            authenticated: false
        }
    }
}

const authStore = (state = getToken(), action) => {
    switch (action.type) {
        case 'authenticated':
            localStorage.setItem('user', action.state.user)
            localStorage.setItem('store', action.state.store)
            localStorage.setItem('type', action.state.type)
            localStorage.setItem('token', action.state.token)
            localStorage.setItem('id', action.state.id)
            return action.state;

        case 'desauthenticated':
            return state;

        default:
            return state;
    }
}

let store = createStore(authStore);

export default store;