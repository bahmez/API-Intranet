import {app, root} from './config/express.js'
import { createServer } from "http";
import { Server } from "socket.io";
import { users } from './core/controller/socket.js';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

export const DIR_NAME = dirname(fileURLToPath(import.meta.url));

const http = createServer();
export const io = new Server(http, {
    cors: {
      origin: "http://localhost:3001"
    }
});

app.set('view engine', 'ejs')
app.set('views', './app/view')
app.use('/Assets', root.static('Public'))
app.use(root.urlencoded({extended: true}))
app.use(root.json())

io.on("connection", function (socket) {
    users.push(socket)
    import('./core/controller/controller.js').then((controller) => {
        controller.default(socket, "socket")
    })
    socket.on("disconnect", () => {
        if (socket.token !== undefined)
            deleteCharacterByToken(socket.token)
        var i = users.indexOf(socket);
        users.splice(i, 1);
    })
});

import('./core/controller/controller.js').then((controller) => {
    controller.default(app, "default")
})

app.listen(5050)
http.listen(8000)