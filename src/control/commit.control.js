const GetCommitConfig = require('../service/commit.config');

/* 获取配置以及初始化配置文件 */
const GetCommitMessage = async function(type, cb) {
    /* 1、先获取提交的信息 */
    const log = await GetCommitConfig.GetCommitLog();
    let version;
    /* 2、先确定是否打tag,然后获取源代码版本号 */
    if (type != 'commit') {
        version = await GetCommitConfig.GetPackageVersion();
    }
    if (version) {
        cb(JSON.stringify({
            version: version.version,
            message: log.message,
            date: log.date,
            commit: log.commit
        }))
    } else {
        cb(JSON.stringify(log));
    }
}
module.exports = GetCommitMessage;