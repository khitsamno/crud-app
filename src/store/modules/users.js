import { userService } from '../../services/index';

const users = {
    namespaced: true,
    state: { users: [], message: '', token: localStorage.getItem('token') || '', fullname: '' },
    mutations: {
        SET_USERS: (state, data) => {
            state.users = data;
        },
        REGISTER: (state, data) => {
            state.users = data;
        },
        LOGIN: (state, token) => {
            state.token = token;
        },
        LOGIN_ERROR: (state, message) => {
            state.message = message
        },
        LOGIN_SUCCESS: (state) => {
            state.message = ""
        },
        LOGOUT: (state) => {
            state.token = ""
        },
        USERN_NAME: (state, data) => {
            state.fullname = data;
        }
    },

    actions: {
        loadUsers: ({ commit }) => {
            let data = userService.getAll();
            commit('SET_USERS', data)
        },
        getUserLogin: ({ commit }) => {
            const user = userService.getUserLogin();
            commit('USERN_NAME', user.fullname)
        },
        register: ({ commit }, payload) => {

            let response = userService.register(payload);
            commit('REGISTER', JSON.parse(JSON.stringify(response)))

        },
        login: ({ commit }, payload) => {
            let response = userService.login(payload);
            if (response) {
                commit('LOGIN', response)
                commit('LOGIN_SUCCESS')
            } else {
                let message = "Invalid credential";
                commit('LOGIN_ERROR', message)
            }
        },
        logout: ({ commit }) => {
            commit('logout')
            userService.logout();
        }

    },
}

export { users };