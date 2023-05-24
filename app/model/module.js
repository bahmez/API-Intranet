export async function getAllModules(cookie) {
    const opts = {
        headers: {
            cookie: cookie,
            "Content-Type": "application/json",
            accept: "application/json"
        }
    };
    const result = await fetch("https://intra.epitech.eu/course/filter?format=json")
    if (result.statusCode >= 400)
        throw "error code : " + result.statusCode;
    return result.json();
}