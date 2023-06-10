import {getModuleInformation} from "../model/module.js";
import {getAllEnglishActivities, getAllEnglishModules, getAllTepitechModules} from "../model/english.js";
import {getAllNoteInProfile} from "../model/profile.js";

export default function index(app) {
    app.get('/tepitek', async (request, response) => {
        let cookies = request.headers.cookie;
        let tepiteks = [];

        let tepitechModule = await getAllTepitechModules(cookies);
        let notes = await getAllNoteInProfile(response.locals.email, cookies);

        for (const tepitek of tepitechModule) {
            let details = await getModuleInformation(tepitek.scolaryear, tepitek.code, tepitek.codeinstance, cookies);
            let managers = [];
            let activities = [];
            let notesTepitek = [];

            details["resp"].forEach((manager, index) => {
                managers.push({
                    email: manager["login"],
                    fullname: manager["title"],
                    picture: "https://intra.epitech.eu" + manager["picture"]
                })
            })
            notes["notes"].forEach((note) => {
                if (note.scolaryear !== tepitek.scolaryear || note.codemodule !== tepitek.code || note.codeinstance !== tepitek.codeinstance)
                    return;
                notesTepitek.push({
                    scholarYear: note["scolaryear"],
                    codeModule: note["codemodule"],
                    titleModule: note["titlemodule"],
                    codeInstance: note["codeinstance"],
                    codeActivity: note["codeacti"],
                    title: note["title"],
                    date: note["date"],
                    corrector: note["correcteur"],
                    note: note["final_note"],
                    comment: note["comment"]
                })
            })
            details["activites"].forEach((activity, index) => {
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
            tepiteks.push({
                scholarYear: details["scolaryear"],
                codeModule: details["codemodule"],
                codeInstance: details["codeInstance"],
                semester: details["semester"],
                title: details["title"],
                beginDate: details["begin"],
                endRegisterDate: details["end_register"],
                endDate: details["end"],
                credits: details["credits"],
                description: details["description"],
                competence: details["competence"],
                managers,
                allowRegister: details["allow_register"],
                activities,
                notes: notesTepitek
            })
        }
        return response.status(200).json(tepiteks);
    })
    app.get('/tepitek/:year', async (request, response) => {
        let cookies = request.headers.cookie;
        let year = request.params.year;
        let tepiteks = [];

        let tepitechModule = await getAllTepitechModules(cookies);
        let notes = await getAllNoteInProfile(response.locals.email, cookies);

        for (const tepitek of tepitechModule) {
            if (tepitek.scolaryear.toString() !== year)
                continue;
            let details = await getModuleInformation(tepitek.scolaryear, tepitek.code, tepitek.codeinstance, cookies);
            let managers = [];
            let activities = [];
            let notesTepitek = [];

            details["resp"].forEach((manager, index) => {
                managers.push({
                    email: manager["login"],
                    fullname: manager["title"],
                    picture: "https://intra.epitech.eu" + manager["picture"]
                })
            })
            notes["notes"].forEach((note) => {
                if (note.scolaryear !== tepitek.scolaryear || note.codemodule !== tepitek.code || note.codeinstance !== tepitek.codeinstance)
                    return;
                notesTepitek.push({
                    scholarYear: note["scolaryear"],
                    codeModule: note["codemodule"],
                    titleModule: note["titlemodule"],
                    codeInstance: note["codeinstance"],
                    codeActivity: note["codeacti"],
                    title: note["title"],
                    date: note["date"],
                    corrector: note["correcteur"],
                    note: note["final_note"],
                    comment: note["comment"]
                })
            })
            details["activites"].forEach((activity, index) => {
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
            tepiteks.push({
                scholarYear: details["scolaryear"],
                codeModule: details["codemodule"],
                codeInstance: details["codeInstance"],
                semester: details["semester"],
                title: details["title"],
                beginDate: details["begin"],
                endRegisterDate: details["end_register"],
                endDate: details["end"],
                credits: details["credits"],
                description: details["description"],
                competence: details["competence"],
                managers,
                allowRegister: details["allow_register"],
                activities,
                notes: notesTepitek
            })
        }
        return response.status(200).json(tepiteks);
    })
    app.get('/english', async (request, response) => {
        let cookies = request.headers.cookie;
        let units = [];

        let json = await getAllEnglishModules(cookies);
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
    app.get('/english/activities', async (request, response) => {
        let cookies = request.headers.cookie;
        let activities = [];

        let json = await getAllEnglishActivities(cookies);
        json.forEach((activity) => {
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
        return response.status(200).json(activities);
    })
}