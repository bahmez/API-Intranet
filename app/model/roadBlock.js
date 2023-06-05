import {getAllModules, getModuleInformation} from "./module.js";

export async function getAllRoadBlock(cookie) {
    const modules = await getAllModules(cookie);
    let array = [];

    for (let i = 0; i < modules.length; i++) {
        let title = modules[i].title;

        if (title.includes("Roadblock")) {
            let info = await getModuleInformation(modules[i].scolaryear, modules[i].code, modules[i].codeinstance, cookie);
            array.push(info)
        }
    }
    return array;
}

export async function getAllRoadBlockByYear(year, cookie) {
    const modules = await getAllModules(cookie);
    let array = [];

    for (let i = 0; i < modules.length; i++) {
        let title = modules[i].title;
        let scolarYear = modules[i].scolaryear.toString();

        if (title.includes("Roadblock") && scolarYear === year) {
            let info = await getModuleInformation(modules[i].scolaryear, modules[i].code, modules[i].codeinstance, cookie);
            array.push(info)
        }
    }
    return array;
}
