import {getAlert, getWall} from "../model/notifications.js";
import {isValidObject} from "../utils/isValidObject.js";

function removeTags(str) {
    if ((str===null) || (str===''))
        return false;
    else
        str = str.toString();
    return str.replace( /(<([^>]+)>)/ig, '');
}

export function socket(app) {
    app.on("getNotifications", async (response) => {
        if (!isValidObject(app, response, true)) return app.emit("getNotifications", {"error": "you must be logged in"});

        let messages = [];

        let json = await getWall(app.cookie);
        json["history"].forEach((message) => {
            messages.push({
                type: message["class"],
                content: removeTags(message["content"]),
                date: message["date"],
                id: message["id"],
                idActivity: message["id_activite"],
                title: removeTags(message["title"]),
                user: {
                    picture: "https://intra.epitech.eu" + message["user"]["picture"],
                    fullname: message["user"]["title"]
                },
                isVisible: message["visible"]
            })
        })
        return app.emit("getNotifications", messages);
    })
}

export default function index(app) {
    app.get('/notifications', async (request, response) => {
        let cookies = request.headers.cookie;
        let messages = [];

        let json = await getWall(cookies);
        json["history"].forEach((message) => {
            messages.push({
                type: message["class"],
                content: removeTags(message["content"]),
                date: message["date"],
                id: message["id"],
                idActivity: message["id_activite"],
                title: removeTags(message["title"]),
                user: {
                    picture: "https://intra.epitech.eu" + message["user"]["picture"],
                    fullname: message["user"]["title"]
                },
                isVisible: message["visible"]
            })
        })
        return response.status(200).json(messages);
    })
    app.get('/alert', async (request, response) => {
        let cookies = request.headers.cookie;
        let json = await getAlert(cookies);
        return response.status(200).json({
            credits: {
                achieved: json["credits"]["achieved"],
                inProgress: json["credits"]["inprogress"],
                failed: json["credits"]["failed"]
            },
            alert: {
                activeLog: json["alert"]["active_log"],
                nlogMin: json["alert"]["nlog_min"],
                nlogNor: json["alert"]["nlog_nor"],
                color: json["alert"]["color"],
                since: json["alert"]["since"]
            },
            semester: {
                number: json["semester"]["num"],
                code: json["semester"]["code"]
            }
        });
    })
}