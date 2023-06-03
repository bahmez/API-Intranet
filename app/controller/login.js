import {createConnectionSession, setPhoneNumber} from "../model/login.js";

export function socket(app) {

}

const login = {};

export default function index(app) {
    app.post('/login/start', (request, response) => {
        let token = (Math.random() + 1).toString(36);
        let email = request.body.email
        let password = request.body.password

        if (![email, password].every((value) => value !== undefined)) return response.status(400).json({error: 1})

        login[token] = {code: 100};
        setTimeout(() => {
            delete login[token]
        }, 900000)
        createConnectionSession(email, password).then(id => {
            if ("error" in id) {
                if (id["error"] === "invalidId")
                    login[token] = {code: 404, id};
                else
                    login[token] = {code: 401, id};
            } else if ("valid" in id) {
                login[token] = {code: 202, id: id["id"]};
            } else {
                login[token] = {code: 400, id};
            }
        })
        return response.status(200).json({token})
    })
    app.get('/login/status/:token', (request, response) => {
        let token = request.params.token

        if (!(token in login)) return response.status(404).json({})

        let code = login[token].code;

        return response.status(code).json(login[token])
    })
    app.get('/login/phone/:token/:pin', (request, response) => {
        let token = request.params.token
        let pin = request.params.pin

        if (!token in login) return response.status(404).json({})
        if (login[token].code === 100) return response.status(425).json({})

        setPhoneNumber(login[token].id, pin).then(response => {
            if ("error" in response) {
                if (response["error"] === "invalidId")
                    login[token] = {code: 404, response};
                else
                    login[token] = {code: 401, response};
            } else if ("valid" in response) {
                login[token] = {code: 200, ...response};
            } else {
                login[token] = {code: 400, response};
            }
        })
        return response.status(200).json({})
    })
}