const colors = require('colors');
const QiNiuService = require('../service/qiniu.run');
const GetConfigData = require('../service/order.config');
/* 获取配置以及初始化配置文件 */
const UploadWeb = async function (env) {
    const config = await GetConfigData(env);
    if(config.cdn){
        QiNiuService.CreateUploadList(config.cdn[env], config.outputPath, (res) => {
            QiNiuService.QiniuUpload(config.cdn[env].ak,config.cdn[env].sk,config.cdn[env].bk,res.data,config.cdn[env].url)
        });
    }else{
        console.log(``);
        console.log(`can not find cdn configuration`.red)
    }
}
module.exports = UploadWeb;