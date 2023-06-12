import {
    getAllBinomeInProfile, getAllDocumentsInProfile,
    getAllFlagsInProfile, getAllMissedInProfile,
    getAllNoteInProfile,
    getNetsoulInProfile,
    getProfile
} from "../model/profile.js";
import {isValidObject} from "../utils/isValidObject.js";

export function socket(app) {
    app.on("getGPA", async (response) => {
        if (!isValidObject(app, response, true)) return app.emit("getGPA", {"error": "you must be logged in"});

        let json = await getProfile(app.cookie);
        console.log(json);
        app.emit("getGPA", json["gpa"][0]["gpa"]);
    })
    app.on("getActualCredits", async (response) => {
        if (!isValidObject(app, response, true)) return app.emit("getActualCredits", {"error": "you must be logged in"});

        let json = await getProfile(app.cookie);
        app.emit("getActualCredits", json["credits"]);
    })
    app.on("getAvailableCredits", async (response) => {
        if (!isValidObject(app, response, true)) return app.emit("getAvailableCredits", {"error": "you must be logged in"});
        let availableCredits = 0;

        if (response.email === undefined) return app.emit("getAvailableCredits", {"error": "bad argument"});
        let json = await getAllNoteInProfile(response.email, app.cookie);
        json["modules"].forEach((module, index) => {
            if (module["grade"] !== '-')
                return;
            availableCredits += module["credits"];
        })
        app.emit("getAvailableCredits", availableCredits);
    })
    app.on("getLogTime", async (response) => {
        if (!isValidObject(app, response, true)) return app.emit("getLogTime", {"error": "you must be logged in"});
        let date = response.date;
        let day = 0;

        if (response.email === undefined) return app.emit("getLogTime", {"error": "bad argument"});
        if (date === undefined) return app.emit("getLogTime", {"error": "bad argument"});
        switch (date) {
            case "year":
                day = 356;
                break;
            case "month":
                day = 30;
                break;
            case "week":
                day = 7;
                break;
        }
        let json = await getNetsoulInProfile(response.email, app.cookie);
        return app.emit("getLogTime", json.slice(-day));
    })
    app.on("getNotes", async (response) => {
        if (!isValidObject(app, response, true)) return app.emit("getNotes", {"error": "you must be logged in"});

        let modules = [];

        if (response.email === undefined) return app.emit("getNotes", {"error": "bad argument"});
        let json = await getAllNoteInProfile(response.email, app.cookie);
        json["modules"].forEach((module, index) => {
            let content = {
                scholarYear: module["scolaryear"],
                codeModule: module["codemodule"],
                codeInstance: module["codeinstance"],
                title: module["title"],
                grade: module["grade"],
                credits: module["credits"],
                notes: []
            };
            json["notes"].forEach((note, index) => {
                if (note["codemodule"] !== module["codemodule"])
                    return;
                content["notes"].push({
                    codeActivity: note["codeacti"],
                    title: note["title"],
                    date: note["date"],
                    corrector: note["correcteur"],
                    result: note["final_note"],
                    comment: note["comment"]
                });
            })
            modules.push(content);
        })
        return app.emit("getNotes", modules);
    })
    app.on("getFlags", async (response) => {
        if (!isValidObject(app, response, true)) return app.emit("getFlags", {"error": "you must be logged in"});

        let flags = {
            "ghost": [],
            "difficulty": [],
            "remarkable": [],
            "medal": []
        };

        if (response.email === undefined) return app.emit("getFlags", {"error": "bad argument"});
        let json = await getAllFlagsInProfile(response.email, app.cookie);
        json["flags"]["ghost"]["modules"].forEach((module, index) => {
            flags.ghost.push({
                scholarYear: module["scolaryear"],
                codeModule: module["codemodule"],
                codeInstance: module["codeinstance"],
                title: module["title"],
                grade: module["grade"],
                credits: module["credits"],
                semester: module["semester"]
            })
        })
        json["flags"]["difficulty"]["modules"].forEach((module, index) => {
            flags.difficulty.push({
                scholarYear: module["scolaryear"],
                codeModule: module["codemodule"],
                codeInstance: module["codeinstance"],
                title: module["title"],
                grade: module["grade"],
                credits: module["credits"],
                semester: module["semester"]
            })
        })
        json["flags"]["remarkable"]["modules"].forEach((module, index) => {
            flags.remarkable.push({
                scholarYear: module["scolaryear"],
                codeModule: module["codemodule"],
                codeInstance: module["codeinstance"],
                title: module["title"],
                grade: module["grade"],
                credits: module["credits"],
                semester: module["semester"]
            })
        })
        json["flags"]["medal"]["modules"].forEach((module, index) => {
            flags.medal.push({
                scholarYear: module["scolaryear"],
                codeModule: module["codemodule"],
                codeInstance: module["codeinstance"],
                title: module["title"],
                grade: module["grade"],
                credits: module["credits"],
                semester: module["semester"]
            })
        })
        return app.emit("getFlags", flags);
    })
    app.on("getAbsences", async (response) => {
        if (!isValidObject(app, response, true)) return app.emit("getAbsences", {"error": "you must be logged in"});

        let absences = [];
        let parameter = response.parameter;
        let timestamp = Date.now();

        if (parameter === undefined) return app.emit("getAbsences", {"error": "bad parameter"});
        if (response.email === undefined) return app.emit("getAbsences", {"error": "bad argument"});

        switch (parameter) {
            case "year":
                timestamp -= 356 * 1440 * 60000
                break;
            case "month":
                timestamp -= 30 * 1440 * 60000
                break;
            case "week":
                timestamp -= 7 * 1440 * 60000
                break;
        }
        let json = await getAllMissedInProfile(response.email, app.cookie);
        for (const key in json) {
            json[key].forEach((absence, index) => {
                let time = new Date(absence["begin"])

                if (time.getTime() < timestamp)
                    return;

                let moduleInfo = absence["link_module"].split("/");
                let activityInfo = absence["link_event"].split("/");

                absences.push({
                    moduleTitle: absence["module_title"],
                    activityTitle: absence["acti_title"],
                    module: {
                        scholarYear: moduleInfo[2],
                        codeModule: moduleInfo[3],
                        codeInstance: moduleInfo[4],
                    },
                    event: {
                        codeActivity: activityInfo[5],
                        codeEvent: activityInfo[6]
                    },
                    beginDate: absence["begin"],
                    endDate: absence["end"],
                    categoryTitle: absence["categ_title"]
                })
            })
        }
        return app.emit("getAbsences", absences);
    })
    app.on("getDocuments", async (response) => {
        if (!isValidObject(app, response, true)) return app.emit("getDocuments", {"error": "you must be logged in"});
        let documents = [];

        if (response.email === undefined) return app.emit("getDocuments", {"error": "bad argument"});
        let json = await getAllDocumentsInProfile(response.email, app.cookie);
        json.forEach((document, index) => {
            documents.push({
                title: document["title"],
                language: document["language"],
                size: document["size"],
                time: document["ctime"],
                author: {
                    email: document["modifier"]["login"],
                    fullname: document["modifier"]["title"],
                    picture: "https://intra.epitech.eu" + document["modifier"]["picture"]
                },
                link: "https://intra.epitech.eu" + document["fullpath"]
            })
        })
        return app.emit("getDocuments", documents);
    })
}

export default function index(app) {
    app.get('/user', async (request, response) => {
        let cookies = request.headers.cookie;

        let json = await getProfile(cookies);
        return response.status(200).json({
            email: json["login"],
            fullname: json["title"],
            lastname: json["lastname"],
            firstname: json["firstname"],
            picture: "https://intra.epitech.eu" + json["picture"],
            scholarYear: json["scolaryear"],
            promotion: json["promo"],
            semester: json["semester"],
            semesterCode: json["semester_code"],
            location: json["location"],
            coursesType: json["course_code"],
            studentYear: json["studentyear"],
            credits: json["credits"],
            gpa: json["gpa"][0]["gpa"]
        })
    })
    app.get('/user/available_credits', async (request, response) => {
        let cookies = request.headers.cookie;
        let availableCredits = 0;

        let json = await getAllNoteInProfile(response.locals.email, cookies);
        json["modules"].forEach((module, index) => {
            if (module["grade"] !== '-')
                return;
            availableCredits += module["credits"];
        })
        return response.status(200).json({availableCredits})
    })
    app.get('/user/credits', async (request, response) => {
        let cookies = request.headers.cookie;

        let json = await getProfile(cookies);
        return response.status(200).json({
            credits: json["credits"]
        })
    })
    app.get('/user/gpa', async (request, response) => {
        let cookies = request.headers.cookie;

        let json = await getProfile(cookies);
        return response.status(200).json({
            credits: json["gpa"][0]["gpa"]
        })
    })
    app.get('/user/netsoul', async (request, response) => {
        let cookies = request.headers.cookie;

        let json = await getNetsoulInProfile(response.locals.email, cookies);
        return response.status(200).json(json);
    })
    app.get('/user/netsoul/:date', async (request, response) => {
        let cookies = request.headers.cookie;
        let date = request.params.date;
        let day = 0;

        switch (date) {
            case "year":
                day = 356;
                break;
            case "month":
                day = 30;
                break;
            case "week":
                day = 7;
                break;
        }
        let json = await getNetsoulInProfile(response.locals.email, cookies);
        return response.status(200).json(json.slice(-day));
    })
    app.get('/user/results', async (request, response) => {
        let cookies = request.headers.cookie;
        let modules = [];

        let json = await getAllNoteInProfile(response.locals.email, cookies);
        json["modules"].forEach((module, index) => {
            let content = {
                scholarYear: module["scolaryear"],
                codeModule: module["codemodule"],
                codeInstance: module["codeinstance"],
                title: module["title"],
                grade: module["grade"],
                credits: module["credits"],
                notes: []
            };
            json["notes"].forEach((note, index) => {
                if (note["codemodule"] !== module["codemodule"])
                    return;
                content["notes"].push({
                    codeActivity: note["codeacti"],
                    title: note["title"],
                    date: note["date"],
                    corrector: note["correcteur"],
                    result: note["final_note"],
                    comment: note["comment"]
                });
            })
            modules.push(content);
        })
        return response.status(200).json(modules);
    })
    app.get('/user/results/:parameter', async (request, response) => {
        let cookies = request.headers.cookie;
        let parameter = request.params.parameter;
        let modules = [];

        let json = await getAllNoteInProfile(response.locals.email, cookies);
        json["modules"].forEach((module, index) => {
            let semester = module["codeinstance"].split("-")[1];

            if (semester !== parameter)
                return;
            let content = {
                scholarYear: module["scolaryear"],
                codeModule: module["codemodule"],
                codeInstance: module["codeinstance"],
                title: module["title"],
                grade: module["grade"],
                credits: module["credits"],
                notes: []
            };
            json["notes"].forEach((note, index) => {
                if (note["codemodule"] !== module["codemodule"])
                    return;
                content["notes"].push({
                    codeActivity: note["codeacti"],
                    title: note["title"],
                    date: note["date"],
                    corrector: note["correcteur"],
                    result: note["final_note"],
                    comment: note["comment"]
                });
            })
            modules.push(content);
        })
        return response.status(200).json(modules);
    })
    app.get('/user/flags', async (request, response) => {
        let cookies = request.headers.cookie;
        let flags = {
            "ghost": [],
            "difficulty": [],
            "remarkable": [],
            "medal": []
        };

        let json = await getAllFlagsInProfile(response.locals.email, cookies);
        json["flags"]["ghost"]["modules"].forEach((module, index) => {
            flags.ghost.push({
                scholarYear: module["scolaryear"],
                codeModule: module["codemodule"],
                codeInstance: module["codeinstance"],
                title: module["title"],
                grade: module["grade"],
                credits: module["credits"],
                semester: module["semester"]
            })
        })
        json["flags"]["difficulty"]["modules"].forEach((module, index) => {
            flags.difficulty.push({
                scholarYear: module["scolaryear"],
                codeModule: module["codemodule"],
                codeInstance: module["codeinstance"],
                title: module["title"],
                grade: module["grade"],
                credits: module["credits"],
                semester: module["semester"]
            })
        })
        json["flags"]["remarkable"]["modules"].forEach((module, index) => {
            flags.remarkable.push({
                scholarYear: module["scolaryear"],
                codeModule: module["codemodule"],
                codeInstance: module["codeinstance"],
                title: module["title"],
                grade: module["grade"],
                credits: module["credits"],
                semester: module["semester"]
            })
        })
        json["flags"]["medal"]["modules"].forEach((module, index) => {
            flags.medal.push({
                scholarYear: module["scolaryear"],
                codeModule: module["codemodule"],
                codeInstance: module["codeinstance"],
                title: module["title"],
                grade: module["grade"],
                credits: module["credits"],
                semester: module["semester"]
            })
        })
        return response.status(200).json(flags);
    })
    app.get('/user/partners', async (request, response) => {
        let cookies = request.headers.cookie;
        let partners = [];

        let json = await getAllBinomeInProfile(response.locals.email, cookies);
        json["binomes"].forEach((partner, index) => {
            let activities = [];
            let activitiesTitle = partner["activities"].split(",");
            let activitiesId = partner["id_activities"].split(",");

            activitiesTitle.forEach((title, index) => {
                activities.push({
                    title,
                    id: Number.parseInt(activitiesId[index])
                })
            })
            partners.push({
                email: partner["login"],
                picture: "https://intra.epitech.eu" + partner["picture"],
                activities,
                weight: activities.length
            })
        })
        return response.status(200).json(partners);
    })
    app.get('/user/educational', async (request, response) => {
        let cookies = request.headers.cookie;
        let documents = [];

        let json = await getAllDocumentsInProfile(response.locals.email, cookies);
        json.forEach((document, index) => {
            documents.push({
                title: document["title"],
                language: document["language"],
                size: document["size"],
                time: document["ctime"],
                author: {
                    email: document["modifier"]["login"],
                    fullname: document["modifier"]["title"],
                    picture: "https://intra.epitech.eu" + document["modifier"]["picture"]
                },
                link: "https://intra.epitech.eu" + document["fullpath"]
            })
        })
        return response.status(200).json(documents);
    })
    app.get('/user/absences', async (request, response) => {
        let cookies = request.headers.cookie;
        let absences = [];

        let json = await getAllMissedInProfile(response.locals.email, cookies);
        for (const key in json) {
            json[key].forEach((absence, index) => {
                let moduleInfo = absence["link_module"].split("/");
                let activityInfo = absence["link_event"].split("/");

                absences.push({
                    moduleTitle: absence["module_title"],
                    activityTitle: absence["acti_title"],
                    module: {
                        scholarYear: moduleInfo[2],
                        codeModule: moduleInfo[3],
                        codeInstance: moduleInfo[4],
                    },
                    event: {
                        codeActivity: activityInfo[5],
                        codeEvent: activityInfo[6]
                    },
                    beginDate: absence["begin"],
                    endDate: absence["end"],
                    categoryTitle: absence["categ_title"]
                })
            })
        }
        return response.status(200).json(absences);
    })
    app.get('/user/absences/:parameter', async (request, response) => {
        let cookies = request.headers.cookie;
        let absences = [];
        let parameter = request.params.parameter;
        let timestamp = Date.now();

        switch (parameter) {
            case "year":
                timestamp -= 356 * 1440 * 60000
                break;
            case "month":
                timestamp -= 30 * 1440 * 60000
                break;
            case "week":
                timestamp -= 7 * 1440 * 60000
                break;
        }
        let json = await getAllMissedInProfile(response.locals.email, cookies);
        for (const key in json) {
            json[key].forEach((absence, index) => {
                let time = new Date(absence["begin"])

                if (time.getTime() < timestamp)
                    return;

                let moduleInfo = absence["link_module"].split("/");
                let activityInfo = absence["link_event"].split("/");

                absences.push({
                    moduleTitle: absence["module_title"],
                    activityTitle: absence["acti_title"],
                    module: {
                        scholarYear: moduleInfo[2],
                        codeModule: moduleInfo[3],
                        codeInstance: moduleInfo[4],
                    },
                    event: {
                        codeActivity: activityInfo[5],
                        codeEvent: activityInfo[6]
                    },
                    beginDate: absence["begin"],
                    endDate: absence["end"],
                    categoryTitle: absence["categ_title"]
                })
            })
        }
        return response.status(200).json(absences);
    })
}