import puppeteer from "puppeteer";
import { setTimeout } from 'timers/promises';
import {JSDOM} from "jsdom";

/**
 * {
 *     "email": email,
 *     "password": password,
 *     "time": seconds,
 *     "step":
 *          "login" |
 *          "phone" |
 *          "authenticator" |,
 *     "browser": BrowserSession,
 *     "page": PageSession
 * }
 */
var sessions = [];

async function deleteSession(id) {
    try {
        await sessions[id].browser.close();
    } catch (error) {
        console.log(error);
    }
    sessions.splice(id, 1);
}

setInterval(() => {
    sessions.forEach(async (value, index) => {
        value.time--;
        if (value.time <= 0) {
            await deleteSession(index);
        }
    })
}, 1000)

async function getMicrosoftLink() {
    try {
        const response = await fetch("https://intra.epitech.eu/").then(res => res.text());
        const dom = new JSDOM(response);
        return dom.window.document.querySelector(".login-student a").getAttribute("href");
    } catch (error) {
        console.log(error);
        return undefined;
    }
}

export async function createConnectionSession(email, password) {
    var json = {email, password, time: 5000, step: "login"};
    const browser = await puppeteer.launch({
        executablePath: 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe',
        headless: true,
        args: [
            `--window-size=1920,1080`,
            '--no-sandbox',
            'disable-infobars',
            '--disable-notifications',
            '--enable-javascript',
            "--mute-audio",
            "--autoplay-policy=no-user-gesture-required",
            '--disable-web-security',
            '--disable-features=IsolateOrigins,site-per-process'
        ],
        ignoreDefaultArgs: ["--disable-extensions"]
    });

    json["browser"] = browser;
    const url = await getMicrosoftLink();
    try {
        const page = await browser.newPage();
        await page.setViewport({
            width: 1800,
            height: 2500
        });
        await page.goto(url);
        await setTimeout(5000);
        await page.type("input[type=email]", email);
        await setTimeout(1000);
        await page.click("input[type=submit]");
        await setTimeout(5000);
        await page.type("#passwordInput", password);
        await setTimeout(1000);
        await page.click("#submitButton");
        await setTimeout(5000);
        var validId = await page.evaluate(() => {
            return (document.querySelector("div.table[data-value=OneWaySMS]") !== null);
        })
        await page.click("div.table[data-value=OneWaySMS]");
        if (!validId)
            return {error: "invalidId"};
        json["page"] = page;
    } catch (error) {
        console.log(error);
        return {error: "internal", message: error};
    }
    let id = sessions.push(json) - 1;
    return {valid: 1, id};
}

export async function setPhoneNumber(id, number) {
    const json = sessions[id];
    const browser = json["browser"];
    const page = json["page"];

    try {
        await page.type("input[type=tel]", number);
        await setTimeout(1000);
        await page.click("input[type=submit]");
        await setTimeout(5000);
        var validId = await page.evaluate(() => {
            return (document.querySelector("#ProofUpDescription") !== null);
        })
        if (validId) {
            await page.click(".form-group a");
            await setTimeout(5000);
        }
        await page.click("input#idBtn_Back[type=button]");
        await setTimeout(5000);
        if (!page.url().includes("https://intra.epitech.eu/"))
            return {error: "invalidConnection"};
        const cookie = await page.cookies();
        await page.goto("https://my.epitech.eu/");
        await setTimeout(5000);
        await page.click("a.mdl-button > .mdl-button__ripple-container");
        await setTimeout(2000);
        const token = await page.evaluate(() => window.localStorage["argos-api.oidc-token"].replaceAll('\"', ""));
        await deleteSession(id);
        return {valid: 1, cookie, token};
    } catch (error) {
        console.log(error);
        return {error: "internal", message: error};
    }
}
