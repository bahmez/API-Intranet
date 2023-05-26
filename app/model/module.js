import {JSDOM} from "jsdom";
import {convertStringToDate} from "../utils/convertStringToDate.js";

export async function getAllModules(cookie) {
    const opts = {
        headers: {
            cookie: cookie,
            "Content-Type": "application/json",
            accept: "application/json"
        }
    };
    const result = await fetch("https://intra.epitech.eu/course/filter?format=json", opts)
    if (result.statusCode >= 400)
        throw "error code : " + result.statusCode;
    return result.json();
}

export async function getModuleInformation(scolarYear, code, codeInstance, cookie) {
    const opts = {
        headers: {
            cookie: cookie
        }
    };
    const result = await fetch("https://intra.epitech.eu/module/" + scolarYear + "/" + code + "/" + codeInstance + "/?format=json", opts)
    if (result.statusCode >= 400)
        throw "error code : " + result.statusCode;
    return result.json();
}

export async function getProjectInformation(scolarYear, code, codeInstance, codeActivity, cookie) {
    const opts = {
        headers: {
            cookie: cookie
        }
    };
    const result = await fetch("https://intra.epitech.eu/module/" + scolarYear + "/" + code + "/" + codeInstance + "/" + codeActivity + "/project/?format=json", opts)
    if (result.statusCode >= 400)
        throw "error code : " + result.statusCode;
    return result.json();
}

export async function getRdvInformation(scolarYear, code, codeInstance, codeActivity, cookie) {
    const opts = {
        headers: {
            cookie: cookie
        }
    };
    const result = await fetch("https://intra.epitech.eu/module/" + scolarYear + "/" + code + "/" + codeInstance + "/" + codeActivity + "/rdv/?format=json", opts)
    if (result.statusCode >= 400)
        throw "error code : " + result.statusCode;
    return result.json();
}

export async function getNoteInformation(scolarYear, code, codeInstance, codeActivity, cookie) {
    const opts = {
        headers: {
            cookie: cookie
        }
    };
    const result = await fetch("https://intra.epitech.eu/module/" + scolarYear + "/" + code + "/" + codeInstance + "/" + codeActivity + "/note/?format=json", opts)
    if (result.statusCode >= 400)
        throw "error code : " + result.statusCode;
    return result.json();
}

export async function getEventInformation(scolarYear, code, codeInstance, codeActivity, codeEvent, cookie) {
    const opts = {
        headers: {
            cookie: cookie
        }
    };
    const result = await fetch("https://intra.epitech.eu/module/" + scolarYear + "/" + code + "/" + codeInstance + "/" + codeActivity + "/" + codeEvent + "/?format=json", opts)
    if (result.statusCode >= 400)
        throw "error code : " + result.statusCode;
    return result.json();
}

export async function getRegisteredEvent(scolarYear, code, codeInstance, codeActivity, codeEvent, cookie) {
    const opts = {
        headers: {
            cookie: cookie
        }
    };
    const result = await fetch("https://intra.epitech.eu/module/" + scolarYear + "/" + code + "/" + codeInstance + "/" + codeActivity + "/" + codeEvent + "/registered?format=json", opts)
    if (result.statusCode >= 400)
        throw "error code : " + result.statusCode;
    return result.json();
}

export async function registerInModule(scolarYear, code, codeInstance, cookie) {
    const opts = {
        method: 'POST',
        headers: {
            cookie: cookie
        }
    };
    const result = await fetch("https://intra.epitech.eu/module/" + scolarYear + "/" + code + "/" + codeInstance + "/register?format=json", opts)
    if (result.statusCode >= 400)
        throw "error code : " + result.statusCode;
    return result.json();
}

export async function unregisterInModule(scolarYear, code, codeInstance, cookie) {
    const opts = {
        method: 'POST',
        headers: {
            cookie: cookie
        }
    };
    const result = await fetch("https://intra.epitech.eu/module/" + scolarYear + "/" + code + "/" + codeInstance + "/unregister?format=json", opts)
    if (result.statusCode >= 400)
        throw "error code : " + result.statusCode;
    return result.json();
}

export async function registerInEvent(scolarYear, code, codeInstance, codeActivity, codeEvent, cookie) {
    const opts = {
        method: 'POST',
        headers: {
            cookie: cookie
        }
    };
    const result = await fetch("https://intra.epitech.eu/module/" + scolarYear + "/" + code + "/" + codeInstance + "/" + codeActivity + "/" + codeEvent + "/register?format=json", opts)
    if (result.statusCode >= 400)
        throw "error code : " + result.statusCode;
    return result.json();
}

export async function unregisterInEvent(scolarYear, code, codeInstance, codeActivity, codeEvent, cookie) {
    const opts = {
        method: 'POST',
        headers: {
            cookie: cookie
        }
    };
    const result = await fetch("https://intra.epitech.eu/module/" + scolarYear + "/" + code + "/" + codeInstance + "/" + codeActivity + "/" + codeEvent + "/unregister?format=json", opts)
    if (result.statusCode >= 400)
        throw "error code : " + result.statusCode;
    return result.json();
}

export async function destroyProjectGroup(scolarYear, code, codeInstance, codeActivity, cookie) {
    const opts = {
        method: 'POST',
        headers: {
            cookie: cookie
        }
    };
    const result = await fetch("https://intra.epitech.eu/module/" + scolarYear + "/" + code + "/" + codeInstance + "/" + codeActivity + "/project/destroygroup?format=json", opts)
    if (result.statusCode >= 400)
        throw "error code : " + result.statusCode;
    return result.json();
}

export async function registerProjectGroup(scolarYear, code, codeInstance, codeActivity, cookie) {
    const opts = {
        method: 'POST',
        headers: {
            cookie: cookie
        }
    };
    const result = await fetch("https://intra.epitech.eu/module/" + scolarYear + "/" + code + "/" + codeInstance + "/" + codeActivity + "/project/register?format=json", opts)
    if (result.statusCode >= 400)
        throw "error code : " + result.statusCode;
    return result.json();
}

export async function registerRDV(scolarYear, code, codeInstance, codeActivity, cookie) {
    const opts = {
        method: 'POST',
        headers: {
            cookie: cookie
        }
    };
    const result = await fetch("https://intra.epitech.eu/module/" + scolarYear + "/" + code + "/" + codeInstance + "/" + codeActivity + "/rdv/register?format=json", opts)
    if (result.statusCode >= 400)
        throw "error code : " + result.statusCode;
    return result.json();
}

export async function unregisterRDV(scolarYear, code, codeInstance, codeActivity, cookie) {
    const opts = {
        method: 'POST',
        headers: {
            cookie: cookie
        }
    };
    const result = await fetch("https://intra.epitech.eu/module/" + scolarYear + "/" + code + "/" + codeInstance + "/" + codeActivity + "/rdv/unregister?format=json", opts)
    if (result.statusCode >= 400)
        throw "error code : " + result.statusCode;
    return result.json();
}

export async function getPlanning(start, end, cookie) {
    const opts = {
        headers: {
            cookie: cookie
        }
    };
    const result = await fetch("https://intra.epitech.eu/planning/load?format=json&start=" + start + "&end=" + end, opts)
    if (result.statusCode >= 400)
        throw "error code : " + result.statusCode;
    return result.json();
}
