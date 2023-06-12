import {getAdminFile} from "../model/adminFile.js";
import {isValidObject} from "../utils/isValidObject.js";

export function socket(app) {
    app.on("getAdministrationResource", async (response) => {
        if (!isValidObject(app, response, true)) return app.emit("getAdministrationResource", {"error": "you must be logged in"});

        let folders = [];
        if (response.path === undefined) {
            let json = await getAdminFile(app.cookie);
            json.forEach((file) => {
                let path = file["fullpath"];
                if (file["mime"] !== null)
                    path = "https://intra.epitech.eu" + path;
                else
                    path = path.replace("/file/", "/")
                folders.push({
                    title: file["title"],
                    secure: file["secure"],
                    language: file["language"],
                    size: file["size"],
                    time: file["ctime"],
                    mime: file["mime"],
                    isLeaf: file["isLeaf"],
                    path
                })
            })
        } else {
            let path = response.path;

            if (path[0] === '/')
                path = path.slice(1);
            if (path[path.length - 1] === '/')
                path = path.slice(0, path.length - 1);
            let json = await getAdminFile(app.cookie, path);
            try {
                json.forEach((file) => {
                    let path = file["fullpath"];
                    if (file["mime"] !== null)
                        path = "https://intra.epitech.eu" + path;
                    else
                        path = path.replace("/file/", "/")
                    folders.push({
                        title: file["title"],
                        secure: file["secure"],
                        language: file["language"],
                        size: file["size"],
                        time: file["ctime"],
                        mime: file["mime"],
                        isLeaf: file["isLeaf"],
                        path
                    })
                })
            } catch (e) {
                return app.emit("getAdministrationResource", {error: "invalid path"});
            }
        }
        return app.emit("getAdministrationResource", folders);
    })
}

export default function index(app) {
    app.get('/public_documents', async (request, response) => {
        let cookies = request.headers.cookie;
        let folders = [];

        let json = await getAdminFile(cookies);
        json.forEach((file) => {
            let path = file["fullpath"];
            if (file["mime"] !== null)
                path = "https://intra.epitech.eu" + path;
            else
                path = path.replace("/file/", "/")
            folders.push({
                title: file["title"],
                secure: file["secure"],
                language: file["language"],
                size: file["size"],
                time: file["ctime"],
                mime: file["mime"],
                isLeaf: file["isLeaf"],
                path
            })
        })
        return response.status(200).json(folders);
    })
    app.post('/public_documents', async (request, response) => {
        let cookies = request.headers.cookie;
        let path = request.body.path;
        let folders = [];

        if (path[0] === '/')
            path = path.slice(1);
        if (path[path.length - 1] === '/')
            path = path.slice(0, path.length - 1);
        let json = await getAdminFile(cookies, path);
        try {
            json.forEach((file) => {
                let path = file["fullpath"];
                if (file["mime"] !== null)
                    path = "https://intra.epitech.eu" + path;
                else
                    path = path.replace("/file/", "/")
                folders.push({
                    title: file["title"],
                    secure: file["secure"],
                    language: file["language"],
                    size: file["size"],
                    time: file["ctime"],
                    mime: file["mime"],
                    isLeaf: file["isLeaf"],
                    path
                })
            })
        } catch (e) {
            return response.status(400).json({error: "invalid path"});
        }
        return response.status(200).json(folders);
    })
}