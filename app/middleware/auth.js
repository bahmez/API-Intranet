import {getProfile} from "../model/profile.js";
import {getResults} from "../model/MyEpitech.js";

export async function verifyToken(request, response, next) {
    let token = request.headers.token
    let cookies = request.headers.cookie;

    if (cookies === undefined) return response.status(403).json({"error": 1})
    if (!token) return response.status(403).json({"error": 1})

    try {
        let json = await getProfile(cookies);
        response.locals.email = json["login"];
        response.locals.location = json["location"];
        await getResults("2014", token);
    } catch (e) {
        return response.status(403).json({"error": 1})
    }
    next();
}

export function executeAuthMiddleware(app) {
    app.use('/user/', verifyToken)
    app.use('/units/', verifyToken)
    app.use('/projects/', verifyToken)
    app.use('/roadblocks/', verifyToken)
    app.use('/tepitek/', verifyToken)
    app.use('/english/', verifyToken)
    app.use('/hub/', verifyToken)
    app.use('/jam/', verifyToken)
    app.use('/videos/', verifyToken)
    app.use('/public_documents/', verifyToken)
    app.use('/notifications/', verifyToken)
    app.use('/alert/', verifyToken)
    app.use('/planning/', verifyToken)
}