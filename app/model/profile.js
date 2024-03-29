export async function getProfile(cookie) {
    const opts = {
        headers: {
            cookie: cookie,
            "Content-Type": "application/json",
            accept: "application/json"
        }
    };
    const result = await fetch("https://intra.epitech.eu/user/?format=json", opts)
    if (result.status >= 400)
        throw "error code : " + result.status;
    return result.json();
}

export async function getAllNoteInProfile(email, cookie) {
    const opts = {
        headers: {
            cookie: cookie,
            "Content-Type": "application/json",
            accept: "application/json"
        }
    };
    const result = await fetch("https://intra.epitech.eu/user/" + email + "/notes/?format=json", opts)
    if (result.status >= 400)
        throw "error code : " + result.status;
    return result.json();
}

export async function getAllFlagsInProfile(email, cookie) {
    const opts = {
        headers: {
            cookie: cookie,
            "Content-Type": "application/json",
            accept: "application/json"
        }
    };
    const result = await fetch("https://intra.epitech.eu/user/" + email + "/flags/?format=json", opts)
    if (result.status >= 400 && result.status !== 500)
        throw "error code : " + result.status;
    return result.json();
}

export async function getAllBinomeInProfile(email, cookie) {
    const opts = {
        headers: {
            cookie: cookie,
            "Content-Type": "application/json",
            accept: "application/json"
        }
    };
    const result = await fetch("https://intra.epitech.eu/user/" + email + "/binome/?format=json", opts)
    if (result.status >= 400)
        throw "error code : " + result.status;
    return result.json();
}

export async function getAllMissedInProfile(email, cookie) {
    const opts = {
        headers: {
            cookie: cookie,
            "Content-Type": "application/json",
            accept: "application/json"
        }
    };
    const result = await fetch("https://intra.epitech.eu/user/" + email + "/notification/missed/?format=json", opts)
    if (result.status >= 400)
        throw "error code : " + result.status;
    return result.json();
}

export async function getAllDocumentsInProfile(email, cookie) {
    const opts = {
        headers: {
            cookie: cookie,
            "Content-Type": "application/json",
            accept: "application/json"
        }
    };
    const result = await fetch("https://intra.epitech.eu/user/" + email + "/document/?format=json", opts)
    if (result.status >= 400)
        throw "error code : " + result.status;
    return result.json();
}

export async function getNetsoulInProfile(email, cookie) {
    const opts = {
        headers: {
            cookie: cookie,
            "Content-Type": "application/json",
            accept: "application/json"
        }
    };
    const result = await fetch("https://intra.epitech.eu/user/" + email + "/netsoul/?format=json", opts)
    if (result.status >= 400)
        throw "error code : " + result.status;
    return result.json();
}
