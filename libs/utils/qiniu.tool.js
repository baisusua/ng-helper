const qiniu = require('qiniu');
module.exports = function (ak, sk, bk) {
    const mac = new qiniu.auth.digest.Mac(ak, sk);
    const options = {
        scope: bk
    };
    const putPolicy = new qiniu.rs.PutPolicy(options);
    const uploadToken = putPolicy.uploadToken(mac);
    const config = new qiniu.conf.Config();
    const formUploader = new qiniu.form_up.FormUploader(config);
    const putExtra = new qiniu.form_up.PutExtra();
    return {
        uploadToken: uploadToken,
        formUploader: formUploader,
        putExtra: putExtra
    }
}