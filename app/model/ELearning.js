export async function getELearning(cookie) {
    const opts = {
        headers: {
            cookie: cookie,
            "Content-Type": "application/json",
            accept: "application/json"
        }
    };
    const result = await fetch("https://intra.epitech.eu/e-learning/?format=json", opts)
    if (result.status >= 400)
        throw "error code : " + result.status;
    return result.json();
}