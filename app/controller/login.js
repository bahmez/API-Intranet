import {createConnectionSession, getInformationLogin, setPhoneNumber} from "../model/login.js";
import {setTimeout} from "timers/promises";
import {isValidObject} from "../utils/isValidObject.js";

const login = {};

export function socket(app) {
    app.on("loginStart", async (response) => {
        if (!isValidObject(app, response, false)) return;
        let email = response.email;
        let password = response.password;

        if (app.token !== undefined) return app.emit("login", {"error": "session already existed"});
        if (![email, password].every((value) => value !== undefined)) return app.emit("login", {"error": "undefined email and/or password"});

        app.login = {code: 100};
        let count = 0;
        let interval = setInterval(() => {
            app.emit("login", app.login);
            count++;
            if (count >= 900)
                delete app.login
        }, 1000)
        createConnectionSession(email, password).then(async id => {
            if ("error" in id) {
                if (id["error"] === "invalidId")
                    app.login = {code: 404, id};
                else
                    app.login = {code: 401, id};
            } else if ("valid" in id) {
                app.login = {code: 202, id: id["id"], pin: id["code"]};
                if (id["code"] >= 0) {
                    while (1) {
                        let response = await getInformationLogin(id["id"]);
                        if ("wait" in response)
                            continue;
                        if ("valid" in response) {
                            app.login = {code: 200, ...response};
                            app.token = "bearer " + response.token;
                            app.cookie = "user=" + response.cookie[0]["value"];
                        } else {
                            app.login = {code: 400, response};
                        }
                        break;
                    }
                }
            } else {
                app.login = {code: 400, id};
            }
        })
    })
    app.on("loginPhone", async (response) => {
        if (!isValidObject(app, response, false)) return;
        let code = response.code;

        if (app.token !== undefined) return app.emit("login", {"error": "session already existed"});
        if (app.login === undefined) return app.emit("login", {"error": "no session exists"})
        if (app.login.code === 100) return app.emit("login", {"error": "login session not ready"})
        if (![code].every((value) => value !== undefined)) return app.emit("login", {"error": "undefined code"});

        setPhoneNumber(app.login.id, code).then(response => {
            if ("error" in response) {
                if (response["error"] === "invalidId")
                    app.login = {code: 404, response};
                else
                    app.login = {code: 401, response};
            } else if ("valid" in response) {
                app.login = {code: 200, ...response};
            } else {
                app.login = {code: 400, response};
            }
        })
    })
}

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
        createConnectionSession(email, password).then(async id => {
            if ("error" in id) {
                if (id["error"] === "invalidId")
                    login[token] = {code: 404, id};
                else
                    login[token] = {code: 401, id};
            } else if ("valid" in id) {
                login[token] = {code: 202, id: id["id"], pin: id["code"]};
                if (id["code"] >= 0) {
                    while (1) {
                        let response = await getInformationLogin(id["id"]);
                        if ("wait" in response)
                            continue;
                        if ("valid" in response) {
                            login[token] = {code: 200, ...response};
                        } else {
                            login[token] = {code: 400, response};
                        }
                        break;
                    }
                }
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