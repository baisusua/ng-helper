const ExecTool = require('../../libs/utils/exec.tool');
const CheckNgCli = async function () {
    console.log(`Check if the ng-cli is installed`.cyan);
    const res = await ExecTool.run('ng -v');
    return res;
}
const NgBuildOrder = async function (order) {
    console.log(`run build`.cyan);
    const res = await ExecTool.run(order);
    return res;
}
const OtherNgOrder = async function (path, data) {
    return new Promise((resolve) => {
        resolve({
            status: true
        });
    })
}
module.exports.CheckNgCli = CheckNgCli;
module.exports.NgBuildOrder = NgBuildOrder;
module.exports.OtherNgOrder = OtherNgOrder;