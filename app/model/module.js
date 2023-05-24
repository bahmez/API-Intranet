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
    const result = await fetch("https://intra.epitech.eu/module/" + scolarYear + "/" + code + "/" + codeInstance, opts)
    if (result.statusCode >= 400)
        throw "error code : " + result.statusCode;
    const dom = new JSDOM(await result.text());

    const description = dom.window.document.querySelector(".item.desc .text").innerText;
    const credit = dom.window.document.querySelector(".item.desc.credits span").innerText;

    const activities = dom.window.document.querySelectorAll("li.activite");
    const projects = [];

    activities.forEach((value) => {
        const dates = value.querySelectorAll(".rzone .item.date");
        const startDate = convertStringToDate(dates[0].querySelector("span:not(.icon)").innerText)
        const endDate = convertStringToDate(dates[1].querySelector("span:not(.icon)").innerText)
        const description = value.querySelector(".data .item.description .text").innerText;
        const dataCode = value.getAttribute("data-code");
        const title = value.querySelector(".item.title .acti-title").innerText;
        var type;
        const typeENUM = ["proj", "tp", "class", "rdv"];
        const isPast =  value.classList.contains("past");

        for (const typeValue of typeENUM) {
            if (value.classList.contains(typeValue)) {
                type = typeValue;
                break;
            }
        }
        const json = {startDate, endDate, description, dataCode, title, type, isPast};
        projects.push(json);
    })
    return {description, credit, projects};
}
