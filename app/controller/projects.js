import {
    getActivity,
    getAllModules,
    getModuleInformation,
    getNoteInformation,
    getProjectInformation,
    getRdvInformation,
    getRegisteredEvent,
    registerInEvent,
    registerProjectGroup,
    registerRDV,
    unregisterInEvent,
    unregisterRDV
} from "../model/module.js";

export default function index(app) {
    app.get('/user/units', async (request, response) => {
        let cookies = request.headers.cookie;
        let units = [];

        let json = await getAllModules(cookies);
        json.forEach((module, index) => {
            if (module["status"] === "notregistered")
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
    app.get('/user/units/:year', async (request, response) => {
        let cookies = request.headers.cookie;
        let year = request.params.year;
        let units = [];

        let json = await getAllModules(cookies);
        json.forEach((module, index) => {
            if (module["status"] === "notregistered")
                return;
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
    app.get('/projects/:year/:code_module/:code_instance/:code_activity', async (request, response) => {
        let cookies = request.headers.cookie;
        let year = request.params.year;
        let codeModule = request.params.code_module;
        let codeInstance = request.params.code_instance;
        let codeActivity = request.params.code_activity;
        let activity = {};

        try {
            activity = await getActivity(year, codeModule, codeInstance, codeActivity, cookies);
        } catch (e) {
            return response.status(400).json({error: "invalid argument"})
        }
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
        return response.status(200).json({
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
        });
    })
    app.get('/projects/:year/:code_module/:code_instance/:type_activity/:code_activity', async (request, response) => {
        let cookies = request.headers.cookie;
        let year = request.params.year;
        let codeModule = request.params.code_module;
        let codeInstance = request.params.code_instance;
        let codeActivity = request.params.code_activity;
        let typeActivity = request.params.type_activity;
        let json = {};

        try {
            switch (typeActivity) {
                case "project":
                    try {
                        json = await getProjectInformation(year, codeModule, codeInstance, codeActivity, cookies);
                    } catch (e) {
                        return response.status(400).json({error: "invalid argument"})
                    }
                    let notRegistered = [];
                    json["notregistered"].forEach((user, index) => {
                        notRegistered.push({
                            email: user['login'],
                            picture: "https://intra.epitech.eu/" + user['picture'],
                            promotion: user["promo"],
                            fullname: user["title"]
                        })
                    })
                    let registered = [];
                    json["registered"].forEach((group, index) => {
                        let members = [];
                        group["members"].forEach((member) => {
                            members.push({
                                email: member["login"],
                                picture: "https://intra.epitech.eu/" + member["picture"],
                                status: member["status"],
                                fullname: member["title"]
                            })
                        })
                        let master = {
                            email: group["master"]["login"],
                            picture: "https://intra.epitech.eu/" + group["master"]["picture"],
                            status: group["master"]["status"],
                            fullname: group["master"]["title"]
                        }
                        registered.push({
                            isClosed: group["closed"],
                            code: group["code"],
                            id: group["id"],
                            master,
                            members,
                            title: group["title"]
                        })
                    })
                    return response.status(200).json({
                        beginDate: json["begin"],
                        isClosed: json["closed"],
                        codeActivity: json["codeacti"],
                        codeInstance: json["codeinstance"],
                        codeModule: json["codemodule"],
                        deadline: json["deadline"],
                        description: json["description"],
                        endDate: json["end"],
                        endRegisterDate: json["end_register"],
                        isRDV: json["is_rdv"],
                        minimalSizeGroup: json["nb_min"],
                        maximalSizeGroup: json["nb_max"],
                        notRegistered,
                        projectTitle: json["project_title"],
                        registered,
                        scholarYear: json["scolaryear"],
                        title: json["title"],
                        typeCode: json["type_code"],
                        typeTitle: json["type_title"]
                    })
                case "rdv":
                    try {
                        json = await getRdvInformation(year, codeModule, codeInstance, codeActivity, cookies);
                    } catch (e) {
                        return response.status(400).json({error: "invalid argument"})
                    }
                    let events = [];
                    json["events"].forEach((event) => {
                        events.push({
                            beginDate: event["begin"],
                            endDate: event["end"],
                            id: event["id"],
                            location: event["location"],
                            title: event["title"]
                        })
                    })
                    let group = null;
                    if (json["group"] !== undefined)
                        group = {
                            code: json["group"]["code"],
                            id: json["group"]["id"],
                            isRegistered: json["group"]["inscrit"],
                            master: json["group"]["master"],
                            members: json["group"]["members"],
                            title: json["group"]["title"]
                        };
                    let project = null;
                    if (json["project"] !== null)
                        project = {
                            codeInstance: json["project"]["codeinstance"],
                            codeModule: json["project"]["codemodule"],
                            id: json["project"]["id"],
                            scholarYear: json["project"]["scolaryear"],
                            title: json["project"]["title"]
                        };
                    let projects = [];
                    json["projects"].forEach((proj) => {
                        projects.push({
                            codeActivity: proj["codeacti"],
                            idProject: proj["id_project"],
                            title: proj["title"]
                        })
                    })
                    let slots = [];
                    json["slots"].forEach((slot) => {
                        let places = [];
                        slot["slots"].forEach((place) => {
                            places.push({
                                activityTitle: place["acti_title"],
                                BlockStatus: place["bloc_status"],
                                code: place["code"],
                                date: place["date"],
                                duration: place["duration"],
                                id: place["id"],
                                teamId: place["id_team"],
                                master: place["master"],
                                members: place["members"],
                                moduleTitle: place["module_title"],
                                note: place["note"],
                                isPast: place["past"],
                                status: place["status"],
                                title: place["title"]
                            })
                        })
                        slots.push({
                            BlockStatus: slot["bloc_status"],
                            codeEvent: slot["codeevent"],
                            id: slot["id"],
                            location: slot["location"],
                            places,
                            title: slot["title"]
                        })
                    })
                    return response.status(200).json({
                        codeActivity: json["codeacti"],
                        codeInstance: json["codeinstance"],
                        codeModule: json["codemodule"],
                        description: json["description"],
                        events,
                        group,
                        moduleTitle: json["module_title"],
                        numberRegistered: json["nb_registered"],
                        numberSlotsFull: json["nb_slots_full"],
                        project,
                        projects,
                        scholarYear: json["scolaryear"],
                        slots,
                        studentRegistered: json["student_registered"],
                        title: json["title"],
                        withProject: json["with_project"]
                    })
                case "note":
                    try {
                        json = await getNoteInformation(year, codeModule, codeInstance, codeActivity, cookies);
                    } catch (e) {
                        return response.status(400).json({error: "invalid argument"})
                    }
                    if (Object.keys(json).length === 0)
                        return response.status(200).json([])
                    let notes = [];
                    json.forEach((note) => {
                        notes.push({
                            comment: note["comment"],
                            date: note["date"],
                            grader: note["grader"],
                            groupMaster: note["group_master"],
                            groupTitle: note["group_title"],
                            email: note["login"],
                            memberStatus: note["member_status"],
                            members: note["members"],
                            note: note["note"],
                            picture: "https://intra.epitech.eu/" + note["picture"],
                            status: note["status"],
                            title: note["title"],
                            type: note["type"],
                            userTitle: note["user_title"]
                        })
                    })
                    return response.status(200).json(notes)
                default:
                    return response.status(400).json({error: "invalid argument"})
            }
        } catch (e) {
            console.log(e)
            return response.status(500).json({error: "internal error"})
        }
    })
    app.post('/projects/:year/:code_module/:code_instance/project/:code_activity/register', async (request, response) => {
        let cookies = request.headers.cookie;
        let year = request.params.year;
        let codeModule = request.params.code_module;
        let codeInstance = request.params.code_instance;
        let codeActivity = request.params.code_activity;
        let json = {};
        try {
            json = await registerProjectGroup(year, codeModule, codeInstance, codeActivity, cookies);
        } catch (e) {
            return response.status(400).json({error: "invalid argument"})
        }
        return response.status(200).json(json)
    })
    app.get('/projects/:year/:code_module/:code_instance/project/:code_activity/unregister', async (request, response) => {
        let cookies = request.headers.cookie;
        let year = request.params.year;
        let codeModule = request.params.code_module;
        let codeInstance = request.params.code_instance;
        let codeActivity = request.params.code_activity;
        let json = {};

        return response.status(200).json(json)
    })
    app.get('/projects/:year/:code_module/:code_instance/rdv/:code_activity/register', async (request, response) => {
        let cookies = request.headers.cookie;
        let year = request.params.year;
        let codeModule = request.params.code_module;
        let codeInstance = request.params.code_instance;
        let codeActivity = request.params.code_activity;
        let json = {};
        try {
            json = await registerRDV(year, codeModule, codeInstance, codeActivity, cookies);
        } catch (e) {
            return response.status(400).json({error: "invalid argument"})
        }
        return response.status(200).json(json)
    })
    app.get('/projects/:year/:code_module/:code_instance/rdv/:code_activity/unregister', async (request, response) => {
        let cookies = request.headers.cookie;
        let year = request.params.year;
        let codeModule = request.params.code_module;
        let codeInstance = request.params.code_instance;
        let codeActivity = request.params.code_activity;
        let json = {};
        try {
            json = await unregisterRDV(year, codeModule, codeInstance, codeActivity, cookies);
        } catch (e) {
            return response.status(400).json({error: "invalid argument"})
        }
        return response.status(200).json(json)
    })
    app.get('/projects/event/:year/:code_module/:code_instance/:code_activity/:code_event/registered', async (request, response) => {
        let cookies = request.headers.cookie;
        let year = request.params.year;
        let codeModule = request.params.code_module;
        let codeInstance = request.params.code_instance;
        let codeActivity = request.params.code_activity;
        let codeEvent = request.params.code_event;
        let registered = [];
        let json = {};

        try {
            json = await getRegisteredEvent(year, codeModule, codeInstance, codeActivity, codeEvent, cookies);
        } catch (e) {
            return response.status(400).json({error: "invalid argument"})
        }
        json.forEach((user) => {
            registered.push({
                dateInstance: user["date_ins"],
                id: user["id"],
                email: user["login"],
                picture: "https://intra.epitech.eu/" + user["picture"],
                present: user["present"],
                isRegistered: user["registered"],
                fullname: user["title"]
            })
        })
        return response.status(200).json(registered)
    })
    app.get('/projects/event/:year/:code_module/:code_instance/:code_activity/:code_event/register', async (request, response) => {
        let cookies = request.headers.cookie;
        let year = request.params.year;
        let codeModule = request.params.code_module;
        let codeInstance = request.params.code_instance;
        let codeActivity = request.params.code_activity;
        let codeEvent = request.params.code_event;
        let json = {};
        try {
            json = await registerInEvent(year, codeModule, codeInstance, codeActivity, codeEvent, cookies);
        } catch (e) {
            return response.status(400).json({error: "invalid argument"})
        }
        return response.status(200).json(json)
    })
    app.get('/projects/event/:year/:code_module/:code_instance/:code_activity/:code_event/unregister', async (request, response) => {
        let cookies = request.headers.cookie;
        let year = request.params.year;
        let codeModule = request.params.code_module;
        let codeInstance = request.params.code_instance;
        let codeActivity = request.params.code_activity;
        let codeEvent = request.params.code_event;
        let json = {};
        try {
            json = await unregisterInEvent(year, codeModule, codeInstance, codeActivity, codeEvent, cookies);
        } catch (e) {
            return response.status(400).json({error: "invalid argument"})
        }
        return response.status(200).json(json)
    })
}