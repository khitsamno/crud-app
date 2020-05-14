import { todoService } from "../../services";

const todos = {
    namespaced: true,
    state: {
        todos: []
    },
    getters: {
        getTodo: state => {
            return state.todos
        },
        getTodoLength: state => {
            return state.todos.length
        },
    },
    mutations: {
        SET_TODO: (state, todo) => state.todos = todo,
        ADD_TODO: (state, todo) => state.todos.unshift(todo),
        REMOVE_TODO: (state, todo) => state.todos = todo,
        GET_EDIT_TODO: (state, id) => {
            let editTodo = state.todos.find(todo => todo.id == id)
            editTodo['isEdit'] = true
        },
        UPDATE_TODO: (state, payload) => {
            let editTodo = state.todos.find(todo => todo.id == payload.id)
            editTodo['title'] = payload.title;
            editTodo['isEdit'] = false
        }

    },
    actions: {
        loadData: ({ commit }) => {
            let data = todoService.getAll();
            commit('SET_TODO', data)
        },

        addNewTodo: ({ commit }, title) => {
            let data = todoService.create(title);
            commit('ADD_TODO', JSON.parse(JSON.stringify(data)));
        },
        removeTodo: ({ commit }, id) => {
            let data = todoService.remove(id);
            commit('REMOVE_TODO', data);
        },
        getEditTodo: ({ commit }, id) => {
            commit('GET_EDIT_TODO', id);
        },
        updateTodo: ({ commit }, payload) => {
            todoService.update(payload);
            commit('UPDATE_TODO', payload);
        }

    },

}

export default todos;