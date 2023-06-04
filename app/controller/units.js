import {getAllModules, getModuleInformation, registerInModule, unregisterInModule} from "../model/module.js";

export default function index(app) {
    app.get('/units', async (request, response) => {
        let cookies = request.headers.cookie;
        let units = [];

        let json = await getAllModules(cookies);
        json.forEach((module, index) => {
            units.push({
                semester: module["semester"],
                beginDate: module["begin"],
                endDate: module["end"],
                endRegisterDate: module["end_register"],
                scholarYear: module["scolaryear"],
                codeModule: module["code"],
                codeInstance: module["codeinstance"],
                location: module["location_title"],
                credits: module["credits"],
                status: module["status"],
                title: module["title"]
            })
        })
        return response.status(200).json(units);
    })
    app.get('/units/:year', async (request, response) => {
        let cookies = request.headers.cookie;
        let year = request.params.year;
        let units = [];

        let json = await getAllModules(cookies);
        json.forEach((module, index) => {
            if (module["scolaryear"].toString() !== year)
                return;
            units.push({
                semester: module["semester"],
                beginDate: module["begin"],
                endDate: module["end"],
                endRegisterDate: module["end_register"],
                scholarYear: module["scolaryear"],
                codeModule: module["code"],
                codeInstance: module["codeinstance"],
                location: module["location_title"],
                credits: module["credits"],
                status: module["status"],
                title: module["title"]
            })
        })
        return response.status(200).json(units);
    })
    app.get('/unit/:year/:code_module/:code_instance', async (request, response) => {
        let cookies = request.headers.cookie;
        let year = request.params.year;
        let codeModule = request.params.code_module;
        let codeInstance = request.params.code_instance;
        let json = {};

        try {
            json = await getModuleInformation(year, codeModule, codeInstance, cookies);
        } catch (e) {
            return response.status(400).json({error: "invalid argument"})
        }
        let managers = [];
        let activities = [];

        json["resp"].forEach((manager, index) => {
            managers.push({
                email: manager["login"],
                fullname: manager["title"],
                picture: "https://intra.epitech.eu" + manager["picture"]
            })
        })
        json["activites"].forEach((activity, index) => {
            let project = null;
            let events = [];

            if (activity["project"] !== null)
                project = {
                    id: activity["id"],
                    scholarYear: activity["scolaryear"],
                    codeModule: activity["codemodule"],
                    codeInstance: activity["codeInstance"],
                    title: activity["title"]
                };
            activity["events"].forEach((event, index) => {
                events.push({
                    code: event["code"],
                    seats: event["seats"],
                    title: event["title"],
                    description: event["description"],
                    beginDate: event["begin"],
                    endDate: event["end"],
                    location: event["location"],
                })
            })
            activities.push({
                codeActivity: activity["codeacti"],
                title: activity["title"],
                description: activity["description"],
                typeTitle: activity["type_title"],
                typeCode: activity["type_code"],
                beginDate: activity["begin"],
                startDate: activity["start"],
                endRegisterDate: activity["end_register"],
                deadline: activity["deadline"],
                endDate: activity["end"],
                numberHours: activity["nb_hours"],
                isProject: activity["is_projet"],
                idProject: activity["id_projet"],
                titleProject: activity["project_title"],
                isNote: activity["is_note"],
                project,
                events
            })
        })
        return response.status(200).json({
            scholarYear: json["scolaryear"],
            codeModule: json["codemodule"],
            codeInstance: json["codeInstance"],
            semester: json["semester"],
            title: json["title"],
            beginDate: json["begin"],
            endRegisterDate: json["end_register"],
            endDate: json["end"],
            credits: json["credits"],
            description: json["description"],
            competence: json["competence"],
            managers,
            allowRegister: json["allow_register"],
            activities
        });
    })
    app.get('/unit/:year/:code_module/:code_instance/register', async (request, response) => {
        let cookies = request.headers.cookie;
        let year = request.params.year;
        let codeModule = request.params.code_module;
        let codeInstance = request.params.code_instance;
        let json = {};

        try {
            json = await registerInModule(year, codeModule, codeInstance, cookies);
        } catch (e) {
            return response.status(400).json({error: "invalid argument"})
        }
        return response.status(200).json(json)
    })
    app.get('/unit/:year/:code_module/:code_instance/unregister', async (request, response) => {
        let cookies = request.headers.cookie;
        let year = request.params.year;
        let codeModule = request.params.code_module;
        let codeInstance = request.params.code_instance;
        let json = {};

        try {
            json = await unregisterInModule(year, codeModule, codeInstance, cookies);
        } catch (e) {
            return response.status(400).json({error: "invalid argument"})
        }
        return response.status(200).json(json)
    })
}