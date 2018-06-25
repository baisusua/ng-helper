const QiNiuTool = require('../../libs/utils/qiniu.tool');
const colors = require('colors');
const glob = require('glob');
const publicPath = process.cwd();
const QiniuUpload = function (ak, sk, bk, list, url) {
    console.log(`Total: ${list.length}`.cyan);
    const config = QiNiuTool(ak, sk, bk);
    list.forEach((item, index) => {
        config.formUploader.putFile(config.uploadToken, item.key, item.path, config.putExtra, function (respErr, respBody, respInfo) {
            if (respErr) {
                console.log(`Error message`.red);
                console.log(colors.yellow(respErr));
                console.log(``);
            }
            if (respInfo.statusCode == 200) {
                console.log(colors.green(`upload ${url?url:'~'}/${respBody.key} done`));
            } else {
                console.log(`Waring code: ${respInfo.statusCode}`.yellow);
                console.log(colors.white(respBody));
                console.log(``);
            }
        })
    });
}
const CreateUploadList = function (config, path, cb) {
    glob(`${publicPath}/${path}/**`, {
        nodir: true
    }, function (err, files) {
        if (err) {
            cb({
                status: false,
                data: []
            })
        } else {
            const list = [];
            files.forEach((file, index) => {
                if (config.ignore && config.ignore.length > 0) {
                    config.ignore.forEach((item, s) => {
                        if (file.indexOf(item.replace('*', '')) == -1) {
                            const a = file.split('/');
                            list.push({
                                path: file,
                                key: `${config.v}/${config.dirname}/` + a[a.length - 1]
                            })
                        }
                    })
                } else {
                    const a = file.split('/');
                    list.push({
                        path: file,
                        key: `${config.v}/${config.dirname}/` + a[a.length - 1]
                    })
                }
            })
            cb({
                status: true,
                data: list
            })
        }
    })
}
module.exports.QiniuUpload = QiniuUpload;
module.exports.CreateUploadList = CreateUploadList;