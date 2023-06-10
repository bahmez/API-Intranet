import {getDetailResult, getProjectResult, getResults} from "../model/MyEpitech.js";

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