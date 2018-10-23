const qiniu = require('qiniu');
const colors = require('colors');
module.exports = function(ak, sk, bk) {
    const mac = new qiniu.auth.digest.Mac(ak, sk);
    const options = {
        scope: bk
    };
    const putPolicy = new qiniu.rs.PutPolicy(options);
    const uploadToken = putPolicy.uploadToken(mac);
    const uploadFile = function(uptoken, key, file, url, isZone) {
        const config = new qiniu.conf.Config();
        if (isZone && qiniu.zone[isZone]) {
            config.zone = qiniu.zone[isZone];
        }
        const putExtra = new qiniu.form_up.PutExtra();
        const formUploader = new qiniu.form_up.FormUploader(config);
        formUploader.putFile(uptoken, key, file, putExtra, function(respErr, respBody, respInfo) {
            if (respErr) {
                console.log(`Error message`.red);
                console.log(colors.yellow(respErr));
                console.log(``);
            }
            if (respInfo) {
                if (respInfo.statusCode == 200) {
                    console.log(colors.green(`upload ${url?url:'~'}/${respBody.key} done`));
                } else {
                    console.log(`Waring code: ${respInfo.statusCode}`.yellow);
                    console.log(colors.white(respBody));
                    console.log(``);
                }
            }

        });
    }
    return {
        uploadToken: uploadToken,
        uploadFile: uploadFile
    }
}