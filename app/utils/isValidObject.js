export function isValidObject(socket, response, needLogin) {
    if (needLogin && socket.token === undefined)
        return false;
    return !(typeof response !== 'object' || Array.isArray(response) || response === null);
}