const colors = require('colors');
const NgService = require('../service/ng.run');
const GetConfigData = require('../service/order.config');
/* 获取配置以及初始化配置文件 */
const BuildWeb = async function (env, cb) {
    // 1、检查是否安装了ng-cli工具（感觉可以不用这一步）
    // 2、根据配置获取build命令
    // 3、build

    // const ngStatus = await NgService.CheckNgCli();  // 检查

    const config = await GetConfigData(env);
    if (config.build) {
        const build = await NgService.NgBuildOrder(config.build);
        cb(build);
    } else {
        cb({
            status: false
        });
    }
}
module.exports = BuildWeb;