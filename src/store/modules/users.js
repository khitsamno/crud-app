import bcrypt from 'bcryptjs';
import jwt from "jsonwebtoken";
import config from "../../config/config";

const users = {
    namespaced: true,
    state: { users: [], message: '', token: localStorage.getItem('token') },
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
        LOGOUT: (state) => {
            state.token = ""
        }
    },

    actions: {
        loadUsers: ({ commit }) => {
            let data = JSON.parse(localStorage.getItem('users') || "[]");
            commit('SET_USERS', data)
        },
        register: ({ commit }, payload) => {

            let existing = JSON.parse(localStorage.getItem('users'));
            let last = existing ? existing[existing.length - 1]['id'] : 0;
            let data = { "id": last += 1, "fullname": payload.fullname, "username": bcrypt.hashSync(payload.username, 8), "password": bcrypt.hashSync(payload.password, 8) };
            existing = existing ? existing : [];
            existing.push(data);
            localStorage.setItem('users', JSON.stringify(existing));
            commit('REGISTER', JSON.parse(JSON.stringify(data)))
        },
        login: ({ commit }, payload) => {

            let users = JSON.parse(localStorage.getItem('users') || "[]");
            users.filter(user => {
                let usernameIsValid = bcrypt.compareSync(payload.username, user.username);
                let passwordIsValid = bcrypt.compareSync(payload.password, user.password);
                if (usernameIsValid && passwordIsValid) {
                    let token = jwt.sign({ id: user.id }, config.SECRET_KEY, {
                        expiresIn: 86400
                    });
                    commit('LOGIN', token)
                    localStorage.setItem("token", token)

                } else {
                    let message = "Invalid credential";
                    commit('LOGIN_ERROR', message)
                    localStorage.removeItem('token')
                }

            });

        },
        logout: ({ commit }) => {
            commit('logout')
            localStorage.removeItem('token')
        }

    },
}

export { users };