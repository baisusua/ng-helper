const colors = require('colors');
const GitService = require('../service/github.run');
const GetConfigData = require('../service/order.config');

const GitTask = async function (env, cb) {
    const config = await GetConfigData(env);
    if (config.github) {
        const GitConfig = GitService.CreateGitOrder(config.github);
        const init = await GitService.GitInit();
        if (!init.status) {
            cb(init);
            return;
        }
        const checkout = await GitService.GitRun(GitConfig.checkout);
        if (!checkout.status) {
            cb(checkout);
            return;
        }
        const remote = await GitService.GitRun(GitConfig.remote);
        if (!remote.status) {
            cb(remote);
            return;
        }
        const pull = await GitService.GitRun(GitConfig.pull);
        if (!pull.status) {
            cb(pull);
            return;
        }
        const copy = await GitService.GitCopy(config.outputPath,config.github.dirname);
        if (!copy.status) {
            cb(copy);
            return;
        }
        const add = await GitService.GitRun(GitConfig.add);
        if (!add.status) {
            cb(add);
            return;
        }
        if (GitConfig.reset) {
            const reset = await GitService.GitRun(GitConfig.reset);
            if (!reset.status) {
                cb(reset);
                return;
            }
            const commit = await GitService.GitRun(GitConfig.commit);
            if (!commit.status) {
                cb(commit);
                return;
            }
            const push = await GitService.GitRun(GitConfig.push);
            if (!push.status) {
                cb(push);
                return;
            }
        } else {
            const commit = await GitService.GitRun(GitConfig.commit);
            if (!commit.status) {
                cb(commit);
                return;
            }
            const push = await GitService.GitRun(GitConfig.push);
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
const GitClean = async function (cb) {
    const clean = await GitService.GitClean();
    if (!clean.status) {
        cb(clean);
        return;
    }

}
module.exports.GitTask = GitTask;
module.exports.GitClean = GitClean;