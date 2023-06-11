import {getAllActivityHubByYear, getAllJamModules} from "../model/hub.js"
import {getAllNoteInProfile, getProfile} from "../model/profile.js";
import {isValidObject} from "../utils/isValidObject.js";

const xpValues = [
    {
        name: 'Talk',
        xpWinPart: 1,
        xpWinOrg: 4,
        xpLostPart: 1,
    },
    {
        name: 'Workshop',
        xpWinPart: 2,
        xpWinOrg: 7,
        xpLostPart: 2,
    },
    {
        name: 'Hackathon',
        xpWinPart: 6,
        xpWinOrg: 15,
        xpLostPart: 6,
    },
    {
        name: 'Experience',
        xpWinPart: 3,
        xpWinOrg: 0,
        xpLostPart: 0,
    },
];

export function socket(app) {
    app.on("getHubXP", async (response) => {
        if (!isValidObject(app, response, true)) return app.emit("getHubXP", {"error": "you must be logged in"});
        let year = response.year;

        let json = await getAllActivityHubByYear(year, app.cookie);
        let profile = await getProfile(app.cookie);
        let xp = 0.0;

        for (let i = 0; i < json.length; i++) {
            if (!json[i].events || json[i].events.length === 0)
                continue;
            if (json[i].events[0].user_status === 'absent' || json[i].events[0].user_status === 'present' ||
                json[i].events[0].user_status === 'organisateur') {
                let xpData = null;
                let status = json[i].events[0].user_status;

                if (json[i].type_title === 'Talk')
                    xpData = xpValues[0];
                else if (json[i].type_title === 'Workshop')
                    xpData = xpValues[1];
                else if (json[i].type_title === 'Hackaton')
                    xpData = xpValues[2];
                else if (json[i].type_title === 'Hackathon')
                    xpData = xpValues[2];
                else if (json[i].type_title === 'Experience')
                    xpData = xpValues[3];

                if (status === 'absent')
                    xp -= xpData.xpLostPart;
                else if (status === 'organisateur')
                    xp += xpData.xpWinOrg;
                else
                    xp += xpData.xpWinPart;
            }
        }
        let currentYear = profile.studentyear - (parseInt(profile.scolaryear) - year);
        let jsonNotes = await getAllNoteInProfile(profile.internal_email, cookies);
        const currentHubName = 'B' + currentYear * 2 + " - Hub";
        let currentHub = jsonNotes.modules.filter(module => module.title === currentHubName);
        let xpGoal = (currentHub) ? currentHub[0].credits : 0;

        return app.emit("getHubXP", {
            currentXp: xp,
            xpGoal: xpGoal * 10
        })
    })
    app.on("getJam", async (response) => {
        if (!isValidObject(app, response, true)) return app.emit("getJam", {"error": "you must be logged in"});
        let json = await getAllJamModules(app.cookie);
        let validJams = 0;
        let registeredJams = 0;
        let failedJams = 0;

        for (let i = 0; i < json.length; i++) {
            if (json[i].status === 'valid') {
                registeredJams++;
                validJams++;
            } else if (json[i].status === 'fail') {
                registeredJams++;
                failedJams++;
            }
        }

        return app.emit("getJam", {
            registeredJams: registeredJams,
            failedJams: failedJams,
            validJams: validJams
        })
    })
}

export default function index(app) {
    app.get('/hub/xp/:year', async (request, response) => {
        let cookies = request.headers.cookie;
        let year = request.params.year;

        let json = await getAllActivityHubByYear(year, cookies);
        let profile = await getProfile(cookies);
        let xp = 0.0;

        for (let i = 0; i < json.length; i++) {
            if (!json[i].events || json[i].events.length === 0)
                continue;
            if (json[i].events[0].user_status === 'absent' || json[i].events[0].user_status === 'present' ||
                json[i].events[0].user_status === 'organisateur') {
                let xpData = null;
                let status = json[i].events[0].user_status;

                if (json[i].type_title === 'Talk')
                    xpData = xpValues[0];
                else if (json[i].type_title === 'Workshop')
                    xpData = xpValues[1];
                else if (json[i].type_title === 'Hackaton')
                    xpData = xpValues[2];
                else if (json[i].type_title === 'Hackathon')
                    xpData = xpValues[2];
                else if (json[i].type_title === 'Experience')
                    xpData = xpValues[3];

                if (status === 'absent')
                    xp -= xpData.xpLostPart;
                else if (status === 'organisateur')
                    xp += xpData.xpWinOrg;
                else
                    xp += xpData.xpWinPart;
            }
        }
        let currentYear = profile.studentyear - (parseInt(profile.scolaryear) - year);
        let jsonNotes = await getAllNoteInProfile(profile.internal_email, cookies);
        const currentHubName = 'B' + currentYear * 2 + " - Hub";
        let currentHub = jsonNotes.modules.filter(module => module.title === currentHubName);
        let xpGoal = (currentHub) ? currentHub[0].credits : 0;

        return response.status(200).json({
            currentXp: xp,
            xpGoal: xpGoal * 10
        })
    })

    app.get('/jam', async (request, response) => {
        let cookies = request.headers.cookie;
        let json = await getAllJamModules(cookies);
        let validJams = 0;
        let registeredJams = 0;
        let failedJams = 0;

        for (let i = 0; i < json.length; i++) {
            if (json[i].status === 'valid') {
                registeredJams++;
                validJams++;
            } else if (json[i].status === 'fail') {
                registeredJams++;
                failedJams++;
            }
        }

        return response.status(200).json({
            registeredJams: registeredJams,
            failedJams: failedJams,
            validJams: validJams
        })
    })
}