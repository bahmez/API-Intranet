import {getAllActivityHubByYear, getAllJamModules} from "../model/hub.js"
import {getAllNoteInProfile, getProfile} from "../model/profile.js";

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

export default function index(app) {
    app.get('/hub/xp', async (request, response) => {
        let cookies = request.headers.cookie;

        let json = await getAllActivityHubByYear(2022, cookies);
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
        let jsonNotes = await getAllNoteInProfile(profile.internal_email, cookies);
        const currentHubName = profile.semester_code + " - Hub";
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