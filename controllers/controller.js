
const temp_data = require('../data');
const { sendDatatoClient } = require('../public/websocket');
module.exports.Index = async (req, res) => {

    res.sendFile('C:/Users/salman/OneDrive/Desktop/College_SEM4/CNN/web_socket_case_study/templates/index.html');
    temp_data.forEach(element => {
        setTimeout(() => {
            sendDatatoClient(element);
            console.log(element);

        }
            , 1000);

    });

}