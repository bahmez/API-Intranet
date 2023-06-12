import {getAllRoadBlock, getAllRoadBlockByYear} from "../model/roadBlock.js";
import {getAllModules} from "../model/module.js";
import {isValidObject} from "../utils/isValidObject.js";


export function socket(app) {
    app.on("getRoadblocks", async (response) => {
        if (!isValidObject(app, response, true)) return app.emit("getRoadblocks", {"error": "you must be logged in"});

        let year = response.year;

        if (year === undefined) return app.emit("getRoadblocks", {"error": "bad argument"});

        let roadblocks = await getAllRoadBlockByYear(year, response.cookie);
        let results = [];
        let modules = await getAllModules(response.cookie);

        roadblocks.forEach((roadblock) => {
            let result = {
                scholarYear: roadblock.scolaryear,
                codeModule: roadblock.codemodule,
                codeInstance: roadblock.codeinstance,
                title: roadblock.title
            }
            let modulesInfo = getAllModuleRequired(roadblock.description);
            let modulesRoadBlock = [];
            modules.forEach((module) => {
                for (let i = 0; i < modulesInfo.length; i++) {
                    if (!modulesInfo[i].includes(module.code))
                        continue;
                    modulesRoadBlock.push(module);
                }
            })
            let creditsRequired = getCreditRequired(roadblock.description);
            result["modulesRequired"] = modulesRoadBlock;
            result["creditsRequired"] = creditsRequired;
            results.push(result);
        })
        return app.emit("getRoadblocks", results);
    })
}

function getAllModuleRequired(description) {
    let modules = [];
    let lines = description.split('\n');
    lines.splice(0, 3);
    lines.forEach((value) => {
        value = value.trim();
        if (value === '')
            return;
        modules.push(value);
    })
    return modules;
}

function getCreditRequired(description) {
    let credits = description.split("at least ")[1].split(" credits")[0];
    return Number.parseInt(credits);
}

export default function index(app) {
    app.get('/roadblocks', async (request, response) => {
        let cookies = request.headers.cookie;

        let roadblocks = await getAllRoadBlock(cookies);
        let results = [];
        let modules = await getAllModules(cookies);

        roadblocks.forEach((roadblock) => {
            let result = {
                scholarYear: roadblock.scolaryear,
                codeModule: roadblock.codemodule,
                codeInstance: roadblock.codeinstance,
                title: roadblock.title
            }
            let modulesInfo = getAllModuleRequired(roadblock.description);
            let modulesRoadBlock = [];
            modules.forEach((module) => {
                for (let i = 0; i < modulesInfo.length; i++) {
                    if (!modulesInfo[i].includes(module.code))
                        continue;
                    modulesRoadBlock.push(module);
                }
            })
            let creditsRequired = getCreditRequired(roadblock.description);
            result["modulesRequired"] = modulesRoadBlock;
            result["creditsRequired"] = creditsRequired;
            results.push(result);
        })
        return response.status(200).json(results);
    })
    app.get('/roadblocks/:year', async (request, response) => {
        let cookies = request.headers.cookie;
        let year = request.params.year;

        let roadblocks = await getAllRoadBlockByYear(year, cookies);
        let results = [];
        let modules = await getAllModules(cookies);

        roadblocks.forEach((roadblock) => {
            let result = {
                scholarYear: roadblock.scolaryear,
                codeModule: roadblock.codemodule,
                codeInstance: roadblock.codeinstance,
                title: roadblock.title
            }
            let modulesInfo = getAllModuleRequired(roadblock.description);
            let modulesRoadBlock = [];
            modules.forEach((module) => {
                for (let i = 0; i < modulesInfo.length; i++) {
                    if (!modulesInfo[i].includes(module.code))
                        continue;
                    modulesRoadBlock.push(module);
                }
            })
            let creditsRequired = getCreditRequired(roadblock.description);
            result["modulesRequired"] = modulesRoadBlock;
            result["creditsRequired"] = creditsRequired;
            results.push(result);
        })
        return response.status(200).json(results);
    })
}