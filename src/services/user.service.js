import bcrypt from 'bcryptjs';
import jwt from "jsonwebtoken";
import config from "../config/config.js";

function register(payload) {

    let existing = JSON.parse(localStorage.getItem('users'));
    let lastToken = existing ? existing[existing.length - 1] : null;
    let deToken = existing ? jwt.decode(lastToken, config.SECRET_KEY).id : 0;
    let data = { "id": deToken += 1, "fullname": payload.fullname, "username": payload.username, "password": bcrypt.hashSync(payload.password, 8) };
    let token = jwt.sign(data, config.SECRET_KEY, {
        expiresIn: 86400
    }, { algorithm: 'RS256' });
    existing = existing ? existing : [];
    existing.push(token);
    localStorage.setItem('users', JSON.stringify(existing));
    return data;

}

function login(payload) {
    let users = JSON.parse(localStorage.getItem('users') || "[]");
    let token = '';
    if (users.length) {
        let userToken = users.filter(user => jwt.decode(user, config.SECRET_KEY).username == payload.username);
        let userPayload = jwt.decode(userToken.toString(), config.SECRET_KEY);
        let passwordIsValid = bcrypt.compareSync(payload.password, userPayload.password);

        if (passwordIsValid) {
            token = jwt.sign({ id: userPayload.id, fullname: userPayload.fullname }, config.SECRET_KEY, {
                expiresIn: 86400
            }, { algorithm: 'RS256' });
            localStorage.setItem("token", token);
            return token;
        } else {

            localStorage.removeItem('token')
            return token;
        }

    }
    return token;

}

function logout() {
    localStorage.removeItem('token')
}

function getAll() {
    let data = JSON.parse(localStorage.getItem('users') || "[]");
    return data;
}
function getUserLogin() {
    const token = localStorage.getItem('token');
    const userLogin = jwt.decode(token, config.SECRET_KEY);
    return userLogin;
}


export const userService = {
    login,
    logout,
    register,
    getAll,
    getUserLogin
};
