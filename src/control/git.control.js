const colors = require('colors');
const GitService = require('../service/github.run');
const GetConfigData = require('../service/order.config');
const replace = require('replace-in-file');

const GitTask = async function(env, message, cb) {
    const config = await GetConfigData(env);
    if (config.github) {
        if (message) {
            config.github['message'] = message;
        }
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

        /* 检查是否需要上传CDN */
        if (config.cdn) {
            let cndurl;
            if (config.cdn[env].url && config.cdn[env].ak && config.cdn[env].sk && config.cdn[env].bk) {
                cndurl = config.cdn[env].url;
                if (config.cdn[env].v) {
                    cndurl = cndurl ? cndurl + `${config.cdn[env].v}/` : '';
                }
                if (config.cdn[env].dirname) {
                    cndurl = cndurl ? cndurl + `${config.cdn[env].dirname}/` : '';
                }
            };
            if (cndurl) {
                console.log('');
                console.log(`Start run replace img src`.cyan);
                const changes = await replace({
                    files: [
                        config.outputPath + '/*.js',
                        config.outputPath + '/*.css'
                    ],
                    from: (file) => new RegExp('./assets/', 'g'),
                    to: cndurl + 'assets/',
                });
                console.log(`run replace img src done. Replace: ${changes.length}`.green);
                console.log('');
            }
        }

        /* 检查是否需要上传CDN */
        const copy = await GitService.GitCopy(config.outputPath, config.github.dirname);
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
            for (let i = 0; i < GitConfig.reset.length; i++) {
                await GitService.GitRun(GitConfig.reset[i]);
            }
            const commit = await GitService.GitRun(GitConfig.commit);
            if (!commit.status) {
                cb(commit);
                return;
            }
            const push = await GitService.GitRun(GitConfig.push);
            cb(push);
        } else {
            const commit = await GitService.GitRun(GitConfig.commit);
            if (!commit.status) {
                cb(commit);
                return;
            }
            const push = await GitService.GitRun(GitConfig.push);
            cb(push);
        }
    } else {
        cb({
            status: false
        });
    }
}
const GitClean = async function(cb) {
    const clean = await GitService.GitClean();
    if (!clean.status) {
        cb(clean);
        return;
    }

}
module.exports.GitTask = GitTask;
module.exports.GitClean = GitClean;