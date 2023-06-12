export async function getAdminFile(cookie, path = undefined) {
    const opts = {
        headers: {
            cookie: cookie,
            "Content-Type": "application/json",
            accept: "application/json"
        }
    };
    let result;
    if (path === undefined)
        result = await fetch("https://intra.epitech.eu/file/?format=json", opts)
    else
        result = await fetch("https://intra.epitech.eu/file/" + path + "/?format=json", opts)
    if (result.status >= 400)
        throw "error code : " + result.status;
    return result.json();
}