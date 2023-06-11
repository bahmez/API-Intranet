import {getELearning} from "../model/ELearning.js";
import {isValidObject} from "../utils/isValidObject.js";


export function socket(app) {
    app.on("getVideos", async (response) => {
        if (!isValidObject(app, response, true)) return app.emit("getVideos", {"error": "you must be logged in"});

        let units = [];

        let json = await getELearning(app.cookie);
        let keys = Object.keys(json);

        for (let i = 0; i < keys.length; i++) {
            let modules = {};
            let semesterObject = json[keys[i]];
            let modulesKeys = Object.keys(semesterObject["modules"]);

            modulesKeys.forEach((moduleKey) => {
                let moduleObject = semesterObject["modules"][moduleKey];
                let classes = [];

                moduleObject["classes"].forEach((c) => {
                    let steps = [];

                    c["steps"].forEach((step) => {
                        steps.push({
                            title: step["title"],
                            isDisabled: step["step"]["disabled"],
                            type: step["step"]["type"],
                            stepCode: step["step"]["stepcode"],
                            lastView: step["step"]["last_view"],
                            titleStep: step["step"]["titlestep"],
                            fullPath: step["step"]["fullpath"],
                            currentLanguage: step["step"]["current_lanaguage"],
                            code: step["step"]["code"],
                            forumPath: step["step"]["forum_path"]
                        })
                    })
                    classes.push({
                        title: c["title"],
                        type: c["type"],
                        isDisabled: c["disabled"],
                        steps
                    })
                })
                modules[moduleKey] = {
                    title: moduleObject["title"],
                    classes
                };
            })
            units.push({
                semester: keys[i],
                modules
            })
        }
        return app.emit("getVideos", units);
    })
}

export default function index(app) {
    app.get('/videos', async (request, response) => {
        let cookies = request.headers.cookie;
        let units = [];

        let json = await getELearning(cookies);
        let keys = Object.keys(json);

        for (let i = 0; i < keys.length; i++) {
            let modules = {};
            let semesterObject = json[keys[i]];
            let modulesKeys = Object.keys(semesterObject["modules"]);

            modulesKeys.forEach((moduleKey) => {
                let moduleObject = semesterObject["modules"][moduleKey];
                let classes = [];

                moduleObject["classes"].forEach((c) => {
                    let steps = [];

                    c["steps"].forEach((step) => {
                        steps.push({
                            title: step["title"],
                            isDisabled: step["step"]["disabled"],
                            type: step["step"]["type"],
                            stepCode: step["step"]["stepcode"],
                            lastView: step["step"]["last_view"],
                            titleStep: step["step"]["titlestep"],
                            fullPath: step["step"]["fullpath"],
                            currentLanguage: step["step"]["current_lanaguage"],
                            code: step["step"]["code"],
                            forumPath: step["step"]["forum_path"]
                        })
                    })
                    classes.push({
                        title: c["title"],
                        type: c["type"],
                        isDisabled: c["disabled"],
                        steps
                    })
                })
                modules[moduleKey] = {
                    title: moduleObject["title"],
                    classes
                };
            })
            units.push({
                semester: keys[i],
                modules
            })
        }
        return response.status(200).json(units);
    })
    app.get('/videos/:units', async (request, response) => {
        let cookies = request.headers.cookie;
        let units = request.params.units;
        let results = {};

        let json = await getELearning(cookies);
        let keys = Object.keys(json);

        for (let i = 0; i < keys.length; i++) {
            let information = {};
            let semesterObject = json[keys[i]];
            let modulesKeys = Object.keys(semesterObject["modules"]);
            let isFounded = false;

            modulesKeys.forEach((moduleKey) => {
                if (moduleKey !== units)
                    return;
                isFounded = true;
                let moduleObject = semesterObject["modules"][moduleKey];
                let classes = [];

                moduleObject["classes"].forEach((c) => {
                    let steps = [];

                    c["steps"].forEach((step) => {
                        steps.push({
                            title: step["title"],
                            isDisabled: step["step"]["disabled"],
                            type: step["step"]["type"],
                            stepCode: step["step"]["stepcode"],
                            lastView: step["step"]["last_view"],
                            titleStep: step["step"]["titlestep"],
                            fullPath: step["step"]["fullpath"],
                            currentLanguage: step["step"]["current_lanaguage"],
                            code: step["step"]["code"],
                            forumPath: step["step"]["forum_path"]
                        })
                    })
                    classes.push({
                        title: c["title"],
                        type: c["type"],
                        isDisabled: c["disabled"],
                        steps
                    })
                })
                information = {
                    title: moduleObject["title"],
                    classes
                };
            })
            if (!isFounded)
                continue;
            results = {
                semester: keys[i],
                ...information
            };
            break;
        }
        return response.status(200).json(results);
    })
}