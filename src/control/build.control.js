const colors = require('colors');
const NgService = require('../service/ng.run');
const GetConfigData = require('../service/order.config');

const BuildWeb = async function (env, cb) {
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