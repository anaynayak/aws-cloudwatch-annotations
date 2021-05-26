const { CloudWatchClient, DeleteAlarmsCommand } = require("@aws-sdk/client-cloudwatch");

const cloudwatch = new CloudWatchClient();

function getDashboard(name) {
    return new Promise((resolve, reject) => {
        cloudwatch.getDashboard({ DashboardName: name }, (err, data) => {
            if (err) {
                return reject(err);
            }
            resolve(JSON.parse(data.DashboardBody));
        });
    });
}

function putDashboard(name, body) {
    return new Promise((resolve, reject) => {
        cloudwatch.putDashboard({ DashboardName: name, DashboardBody: JSON.stringify(body) }, (err, data) => {
            if (err) {
                return reject(err);
            }
            resolve(data);
        });
    });
}

module.exports = {
    getDashboard: getDashboard,
    putDashboard: putDashboard
}