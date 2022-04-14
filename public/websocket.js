const events = require('events');
const progressEventEmitter = new events.EventEmitter();

function registerProgressEvent(ws) {
    progressEventEmitter.addListener("progress:", function handler({ msg }) {
        ws.send(JSON.stringify({
            type: "progress",
            msg
        }));
    });
}
function sendDatatoClient(msg) {

    progressEventEmitter.emit("progress:", {
        msg
    })
}
module.exports = {
    registerProgressEvent,
    sendDatatoClient,
}