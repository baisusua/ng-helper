const colors = require('colors');
const GitService = require('../service/github.run');
const GetConfigData = require('../service/order.config');
/* 获取配置以及初始化配置文件 */
const GitTask = async function (env, cb) {
    // 1、检查是否安装了git工具（感觉可以不用这一步）
    // 2、根据配置获取git order命令
    // 3、push(clone、checkout、add、reset、commit、push)
    const config = await GetConfigData(env);
    if (config.github) {
        const GitConfig = GitService.CreateGitOrder(config.github);
        const clone = await GitService.GitRun(GitConfig.clone, config.outputPath);
        if (!clone.status) {
            cb(clone);
            return;
        }
        const mv = await GitService.GitRun(GitConfig.mv, config.outputPath);
        if (!mv.status) {
            cb(mv);
            return;
        }
        const rmdir = await GitService.GitRun(GitConfig.rmdir, config.outputPath);
        if (!rmdir.status) {
            cb(rmdir);
            return;
        }
        const head = await GitService.GitRun(GitConfig.head, config.outputPath);
        if (!head.status) {
            cb(head);
            return;
        }

        const checkout = await GitService.GitRun(GitConfig.checkout, config.outputPath);
        if (!checkout.status) {
            cb(checkout);
            return;
        }
        const add = await GitService.GitRun(GitConfig.add, config.outputPath);
        if (!add.status) {
            cb(add);
            return;
        }

        if (GitConfig.reset) {
            const reset = await GitService.GitRun(GitConfig.reset, config.outputPath);
            if (!reset.status) {
                cb(reset);
                return;
            }
            const commit = await GitService.GitRun(GitConfig.commit, config.outputPath);
            if (!commit.status) {
                cb(commit);
                return;
            }
            const push = await GitService.GitRun(GitConfig.push, config.outputPath);
            if (!push.status) {
                cb(push);
                return;
            }
        } else {
            const commit = await GitService.GitRun(GitConfig.commit, config.outputPath);
            if (!commit.status) {
                cb(commit);
                return;
            }
            const push = await GitService.GitRun(GitConfig.push, config.outputPath);
            if (!push.status) {
                cb(push);
                return;
            }
        }
    } else {
        cb({
            status: false
        });
    }
}
module.exports = GitTask;