
const validate = {
    namespaced: true,
    state: {
        validate: {
            message: '',
            type: ''
        }
    },
    getters: {
        getValidate: (state) => state.validate
    },
    mutations: {
        SET_VALIDATE_REGISTER: (state, payload) => {
            if (payload.fullname == '') {
                state.validate.message = 'The fullname is required !';
                state.validate.type = 'fullname';
            } else if (payload.username == '') {
                state.validate.message = 'The username is required !';
                state.validate.type = 'username';
            } else if (payload.password == '') {
                state.validate.message = 'The password is required !';
                state.validate.type = 'password';
            } else if (payload.password.length < 6) {
                state.validate.message = 'The password must be 6 characters !';
                state.validate.type = 'password';
            } else {
                state.validate.message = '';
                state.validate.type = '';
            }
        },
        SET_VALIDATE_LOGIN: (state, payload) => {
            if (payload.username == '') {
                state.validate.message = 'The username is required !';
                state.validate.type = 'username';
            } else if (payload.password == '') {
                state.validate.message = 'The password is required !';
                state.validate.type = 'password';
            } else {
                state.validate.message = '';
                state.validate.type = '';
            }
        },
        SET_VALIDATE_TODO: (state, title) => {
            if (title == '') {
                state.validate.message = 'The title is required !';
                state.validate.type = 'title';
            } else {
                state.validate.message = '';
                state.validate.type = '';
            }
        }
    },
    actions: {
        validateRegister({ commit }, payload) {
            commit('SET_VALIDATE_REGISTER', payload)
        },
        validateLogin({ commit }, payload) {
            commit('SET_VALIDATE_LOGIN', payload)
        },
        validateTodo({ commit }, title) {
            commit('SET_VALIDATE_TODO', title)
        },
    },

}

export default validate;