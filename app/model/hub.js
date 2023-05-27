import {getAllModules, getModuleInformation} from "./module.js";

export async function getAllHubModules(cookie) {
    const modules = getAllModules(cookie);
    let array = [];

    for (let i = 0; i < modules.length; i++) {
        let title = modules[i].title;

        if (title.includes("Hub"))
            array.push(modules[i])
    }
    return array;
}

export async function getAllActivityHub(cookie) {
    const modules = getAllHubModules(cookie);
    let activities = [];

    for (let i = 0; i < modules.length; i++) {
        const info = getModuleInformation(modules[i].scolaryear, modules[i].code, modules[i].codeinstance, cookie);

        activities.concat(info.activites);
    }
    return activities;
}

export async function getAllJamModules(cookie) {
    const modules = getAllModules(cookie);
    let array = [];

    for (let i = 0; i < modules.length; i++) {
        let title = modules[i].title;

        if (title.includes("JAM"))
            array.push(modules[i])
    }
    return array;
}
