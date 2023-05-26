export async function getProfile(cookie) {
    const opts = {
        headers: {
            cookie: cookie,
            "Content-Type": "application/json",
            accept: "application/json"
        }
    };
    const result = await fetch("https://intra.epitech.eu/user/?format=json", opts)
    if (result.statusCode >= 400)
        throw "error code : " + result.statusCode;
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
    if (result.statusCode >= 400)
        throw "error code : " + result.statusCode;
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
    if (result.statusCode >= 400)
        throw "error code : " + result.statusCode;
    return result.json();
}
