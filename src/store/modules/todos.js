
const todos = {
    namespaced: true,
    state: {
        todos: []
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
            let data = JSON.parse(localStorage.getItem('todoLists') || "[]");
            commit('SET_TODO', data)
        },

        addNewTodo: ({ commit }, title) => {

            let existing = JSON.parse(localStorage.getItem('todoLists'));
            let last = existing ? existing[existing.length - 1]['id'] : 0;
            let data = { "id": last += 1, "title": title, "isEdit": false };
            existing = existing ? existing : [];
            existing.push(data);
            localStorage.setItem('todoLists', JSON.stringify(existing));
            commit('ADD_TODO', JSON.parse(JSON.stringify(data)));
        },
        removeTodo: ({ commit }, id) => {
            let data = JSON.parse(localStorage.getItem('todoLists'));
            data.filter((todo, index) => {
                todo.id == id && data.splice(index, 1)
            });

            if (data.length == 0) {
                localStorage.removeItem('todoLists');
            } else {
                localStorage.setItem('todoLists', JSON.stringify(data));
            }
            commit('REMOVE_TODO', data)
        },
        getEditTodo: ({ commit }, id) => {
            commit('GET_EDIT_TODO', id)
        },
        updateTodo: ({ commit }, payload) => {
            let data = JSON.parse(localStorage.getItem('todoLists'));
            data.filter(todo => {
                if (todo.id == payload.id) {
                    todo.title = payload.title
                }
            });
            localStorage.setItem('todoLists', JSON.stringify(data));
            commit('UPDATE_TODO', payload)
        }

    },

}

export { todos };