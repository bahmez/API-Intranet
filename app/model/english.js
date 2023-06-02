import {getAllModules, getModuleInformation} from "./module.js";

export async function getAllEnglishModules(cookie) {
    const modules = getAllModules(cookie);
    let array = [];

    for (let i = 0; i < modules.length; i++) {
        let title = modules[i].title;

        if (title.includes("English"))
            array.push(modules[i])
    }
    return array;
}

export async function getAllTepitechModules(cookie) {
    const modules = getAllModules(cookie);
    let array = [];

    for (let i = 0; i < modules.length; i++) {
        let title = modules[i].title;

        if (title.includes("TEPitech"))
            array.push(modules[i])
    }
    return array;
}

export async function getAllTepitechActivities(cookie) {
    const modules = getAllTepitechModules(cookie);
    let activities = [];

    for (let i = 0; i < modules.length; i++) {
        const info = getModuleInformation(modules[i].scolaryear, modules[i].code, modules[i].codeinstance, cookie);

        activities.concat(info.activites);
    }
    return activities;
}

export async function getAllEnglishActivities(cookie) {
    const modules = getAllEnglishModules(cookie);
    let activities = [];

    for (let i = 0; i < modules.length; i++) {
        const info = getModuleInformation(modules[i].scolaryear, modules[i].code, modules[i].codeinstance, cookie);

        activities.concat(info.activites);
    }
    return activities;
}