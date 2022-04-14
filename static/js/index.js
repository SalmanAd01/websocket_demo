var HOST = location.origin.replace(/^http/, 'ws')
let socket = new WebSocket(`${HOST}`);
var data_amount = [50, 60, 70, 80, 90, 100]
var data_label = ["Jan", "Feb", "Mar", "Apr", "May", "Jun"]
var data_amount_2 = [55, 65, 75, 85, 95, 105]

var line_chart = new ApexCharts(document.querySelector("#chart"), {
    series: [{
        name: "Expenses",
        data: data_amount
    },
    {
        name: "Income",
        data: data_amount_2
    }
    ],
    chart: {
        height: 350,
        type: 'line',
        zoom: {
            enabled: false
        }
    },
    dataLabels: {
        enabled: false
    },
    stroke: {
        curve: 'straight'
    },
    grid: {
        row: {
            colors: ['#f3f3f3', 'transparent'], // takes an array which will be repeated on columns
            opacity: 0.5
        },
    },
    xaxis: {
        categories: data_label,
    }
})
line_chart.render();
// var chart = new ApexCharts(document.querySelector("#chart"), options);
// chart.render();

socket.onmessage = function (message) {
    console.log("data", message.data);
    var json_msg = JSON.parse(message.data);
    // convert String to JSON
    console.log("-->>  ", json_msg.msg.amount_1);
    const now = Date.now();
    console.log('Message Received')
    while (Date.now() - now < 50);
    data_amount.push(json_msg.msg.amount_1);
    data_amount_2.push(json_msg.msg.amount_2);
    data_label.push(json_msg.msg.date);
    line_chart.updateSeries([{
        name: "Expenses",
        data: data_amount
    },
    {
        name: "Income",
        data: data_amount_2
    }])
    console.log("json", json_msg.msg);
    document.getElementById("changeit").innerHTML = JSON.stringify(json_msg.msg);
};
socket.onerror = (error) => {
    console.log(`WebSocket error: ${error}`)
}
socket.onopen = function () {
    socket.send(JSON.stringify({
        "type": "progress",
    }));
};
function send_to_server() {
    socket.send(JSON.stringify({
        msg: "Hello From Client",
    }));
    return true;
};
