import {getAllModules, getModuleInformation} from "./module.js";

export async function getAllEnglishModules(cookie) {
    const modules = await getAllModules(cookie);
    let array = [];

    for (let i = 0; i < modules.length; i++) {
        let title = modules[i].title;

        if (title.includes("English"))
            array.push(modules[i])
    }
    return array;
}

export async function getAllTepitechModules(cookie) {
    const modules = await getAllModules(cookie);
    let array = [];

    for (let i = 0; i < modules.length; i++) {
        let title = modules[i].title;

        if (title.includes("TEPitech"))
            array.push(modules[i])
    }
    return array;
}

export async function getAllTepitechActivities(cookie) {
    const modules = await getAllTepitechModules(cookie);
    let activities = [];

    for (let i = 0; i < modules.length; i++) {
        const info = await getModuleInformation(modules[i].scolaryear, modules[i].code, modules[i].codeinstance, cookie);

        activities = [...activities, ...info.activites];
    }
    return activities;
}

export async function getAllEnglishActivities(cookie) {
    const modules = await getAllEnglishModules(cookie);
    let activities = [];

    for (let i = 0; i < modules.length; i++) {
        const info = await getModuleInformation(modules[i].scolaryear, modules[i].code, modules[i].codeinstance, cookie);

        activities = [...activities, ...info.activites];
    }
    return activities;
}