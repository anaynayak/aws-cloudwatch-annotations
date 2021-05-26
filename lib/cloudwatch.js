import { CloudWatchClient, GetDashboardCommand, PutDashboardCommand } from "@aws-sdk/client-cloudwatch";

const cloudwatch = new CloudWatchClient();

const getDashboard = async function (name) {
    const response = await cloudwatch.send(new GetDashboardCommand({ DashboardName: name }))
    return JSON.parse(response.DashboardBody)
}

const putDashboard = async function(name, body) {
    return await cloudwatch.send(new PutDashboardCommand({ DashboardName: name, DashboardBody: JSON.stringify(body) }))
}

export {getDashboard, putDashboard}