function getAll() {
    let data = JSON.parse(localStorage.getItem('todoLists') || "[]");
    return data;
}
function create(title) {
    let existing = JSON.parse(localStorage.getItem('todoLists'));
    let last = existing ? existing[existing.length - 1]['id'] : 0;
    let data = { "id": last += 1, "title": title, "isEdit": false };
    existing = existing ? existing : [];
    existing.push(data);
    localStorage.setItem('todoLists', JSON.stringify(existing));
    return data;
}
function remove(id) {

    let data = JSON.parse(localStorage.getItem('todoLists'));
    data.filter((todo, index) => {
        todo.id == id && data.splice(index, 1)
    });
    if (data.length == 0) {
        localStorage.removeItem('todoLists');
    } else {
        localStorage.setItem('todoLists', JSON.stringify(data));
    }
    return data;
}
function update(payload) {
    let data = JSON.parse(localStorage.getItem('todoLists'));
    data.filter(todo => {
        if (todo.id == payload.id) {
            todo.title = payload.title
        }
    });
    localStorage.setItem('todoLists', JSON.stringify(data));
    return data;
}
export const todoService = {
    getAll,
    create,
    remove,
    update
};