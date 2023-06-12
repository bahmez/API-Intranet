import {getDetailResult, getProjectResult, getResults} from "../model/MyEpitech.js";
import {isValidObject} from "../utils/isValidObject.js";

export function socket(app) {
    app.on("getAllResults", async (response) => {
        if (!isValidObject(app, response, true)) return app.emit("getAllResults", {"error": "you must be logged in"});

        let year = response.year;

        try {
            let json = await getResults(year, app.token);
            return app.emit("getAllResults", json)
        } catch (e) {
            return app.emit("getAllResults", {error: "invalid request"})
        }
    })
    app.on("getDetailsResult", async (response) => {
        if (!isValidObject(app, response, true)) return app.emit("getDetailsResult", {"error": "you must be logged in"});

        let id = response.id;

        try {
            let json = await getDetailResult(id, app.token);
            return app.emit("getDetailsResult", json)
        } catch (e) {
            return app.emit("getDetailsResult", {error: "invalid request"})
        }
    })
    app.on("getAllResultsProject", async (response) => {
        if (!isValidObject(app, response, true)) return app.emit("getAllResultsProject", {"error": "you must be logged in"});

        let year = response.year;
        let module_name = response.module_name;
        let project_name = response.project_name;

        try {
            let json = await getProjectResult(year, module_name, project_name, app.token);
            return app.emit("getAllResultsProject", json)
        } catch (e) {
            return app.emit("getAllResultsProject", {error: "invalid request"})
        }
    })
}

export default function index(app) {
    app.get('/myepitech/:year', async (request, response) => {
        let token = request.headers.token;
        let year = request.params.year;

        try {
            let json = await getResults(year, token);
            return response.status(200).json(json)
        } catch (e) {
            return response.status(400).json({error: "invalid request"})
        }
    })
    app.get('/myepitech/details/:id', async (request, response) => {
        let token = request.headers.token;
        let id = request.params.id;

        try {
            let json = await getDetailResult(id, token);
            return response.status(200).json(json)
        } catch (e) {
            return response.status(400).json({error: "invalid request"})
        }
    })
    app.get('/myepitech/projects/:year/:module_name/:project_name', async (request, response) => {
        let token = request.headers.token;
        let year = request.params.year;
        let module_name = request.params.module_name;
        let project_name = request.params.project_name;

        try {
            let json = await getProjectResult(year, module_name, project_name, token);
            return response.status(200).json(json)
        } catch (e) {
            return response.status(400).json({error: "invalid request"})
        }
    })
}