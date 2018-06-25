const colors = require('colors');
const QiNiuService = require('../service/qiniu.run');
const GetConfigData = require('../service/order.config');
/* 获取配置以及初始化配置文件 */
const UploadWeb = async function (env, cb) {
    const config = await GetConfigData(env);
    QiNiuService.CreateUploadList(config.cdn[env], config.outputPath, (res) => {
        cb(res);
        QiNiuService.QiniuUpload(config.cdn[env].ak,config.cdn[env].sk,config.cdn[env].bk,res.data,config.cdn[env].url)
    });
}
module.exports = UploadWeb;