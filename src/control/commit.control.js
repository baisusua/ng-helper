const GetCommitConfig = require('../service/commit.config');

/*获取发布信息 */
const GetCommitMessage = async function(type, isTag, cb) {
    /* 1、先获取提交的信息 */
    const log = await GetCommitConfig.GetCommitLog();
    let version;
    let message;
    /* 2、先确定是否打tag,然后获取源代码版本号 */
    if (type != 'commit') {
        version = await GetCommitConfig.GetPackageVersion(isTag);
    }
    if (version) {
        message = `version:${version.version},message:${log.message},date:${log.date},hash:${log.commit}`;
    } else {
        message = `message:${log.message},date:${log.date},hash:${log.commit}`;
    }
    message = message.replace(/"/g, '');
    message = message.replace(/'/g, '');
    message = message.replace(/\s/g, '');
    cb(message);
}
module.exports = GetCommitMessage;