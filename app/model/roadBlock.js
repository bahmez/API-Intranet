import {getAllModules} from "./module.js";

export async function getAllRoadBlock(cookie) {
    const modules = getAllModules(cookie);
    let array = [];

    for (let i = 0; i < modules.length; i++) {
        let title = modules[i].title;

        if (title.includes("Roadblock"))
            array.push(modules[i])
    }
    return array;
}

export async function getAllRoadBlockByYear(cookie, year) {
    const modules = get(cookie);
    let array = [];

    for (let i = 0; i < modules.length; i++) {
        let title = modules[i].title;
        let scolarYear = modules[i].scolaryear;

        if (title.includes("Roadblock") && scolarYear === year)
            array.push(modules[i])
    }
    return array;
}
