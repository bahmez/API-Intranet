import {getAllModules, getModuleInformation} from "./module.js";

export async function getAllHubModules(cookie) {
    const modules = await getAllModules(cookie);
    let array = [];

    for (let i = 0; i < modules.length; i++) {
        let title = modules[i].title;

        if (title.includes("Hub"))
            array.push(modules[i])
    }
    return array;
}

export async function getAllActivityHub(cookie) {
    const modules = await getAllHubModules(cookie);
    let activities = [];

    for (let i = 0; i < modules.length; i++) {
        const info = await getModuleInformation(modules[i].scolaryear, modules[i].code, modules[i].codeinstance, cookie);

        activities = [...activities, ...info.activites];
    }
    return activities;
}

export async function getAllActivityHubByYear(year, cookie) {
    const modules = await getAllHubModules(cookie);
    let activities = [];

    for (let i = 0; i < modules.length; i++) {
        if (year !== modules[i].scolaryear)
            continue;
        const info = await getModuleInformation(modules[i].scolaryear, modules[i].code, modules[i].codeinstance, cookie);

        for (let j = 0; j < info.activites.length; j++) {
            info.activites[j]["scholarYear"] = modules[i].scolaryear;
            info.activites[j]["codeModule"] = modules[i].code;
            info.activites[j]["codeInstance"] = modules[i].codeinstance;
        }
        activities = [...activities, ...info.activites];
    }
    return activities;
}

export async function getAllJamModules(cookie) {
    const modules = await getAllModules(cookie);
    let array = [];

    for (let i = 0; i < modules.length; i++) {
        let title = modules[i].title;

        if (title.includes("JAM"))
            array.push(modules[i])
    }
    return array;
}
