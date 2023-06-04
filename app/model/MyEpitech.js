export async function getResults(year, token) {
    const opts = {
        headers: {
            "Authorization": token,
            "Content-Type": "application/json",
            accept: "application/json"
        }
    };
    const result = await fetch("https://api.epitest.eu/me/" + year, opts)
    if (result.statusCode >= 400)
        throw "error code : " + result.statusCode;
    let content = await result.text();
    if (content === "" || content === undefined || content === "[]")
        return {};
    return result.json();
}

export async function getDetailResult(id, token) {
    const opts = {
        headers: {
            "Authorization": token,
            "Content-Type": "application/json",
            accept: "application/json"
        }
    };
    const result = await fetch("https://api.epitest.eu/me/details/" + id, opts)
    if (result.statusCode >= 400)
        throw "error code : " + result.statusCode;
    let content = await result.text();
    if (content === "" || content === undefined || content === "[]")
        return {};
    return result.json();
}

export async function getProjectResult(year, moduleName, projectName, token) {
    const opts = {
        headers: {
            "Authorization": token,
            "Content-Type": "application/json",
            accept: "application/json"
        }
    };
    const result = await fetch("https://api.epitest.eu/me/" + year + "/" + moduleName + "/" + projectName, opts)
    if (result.statusCode >= 400)
        throw "error code : " + result.statusCode;
    let content = await result.text();
    if (content === "" || content === undefined || content === "[]")
        return {};
    return result.json();
}