const express = require('express');
const app = express();
const port = 5000;
const WSServer = require('ws').Server;
let server = require('http').createServer();
const { registerProgressEvent, timeout } = require('./public/websocket')
const temp_data = require('./data')
let wss = new WSServer({ server });
server.on('request', app);
wss.on('connection', function connection(ws) {
    ws.on("message", function message(rawData) {
        const data = JSON.parse(rawData);
        console.log(data);
        if (data.type === "progress") {
            registerProgressEvent(ws);
        }
    });
});
const { Index } = require("./controllers/controller");
app.use(express.static('static'));
app.get('/', Index);

server.listen(port, () => console.log(`http://localhost:${port}`));