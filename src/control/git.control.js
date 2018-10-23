const colors = require('colors');
const GitService = require('../service/github.run');
const GetConfigData = require('../service/order.config');
const replace = require('replace-in-file');
const open = require('open');

const OpenRemote = function(remote) {
    let url;
    if (remote.indexOf('http') > -1) {
        url = remote.replace('http', 'https');
        url = url.replace('.git', '');
    } else {
        if (remote.indexOf('git@ssh-') > -1) {
            /* gitlab */
            url = remote.replace(':', '/');
            url = url.replace('git@ssh-', 'https://');
            url = url.replace('.git', '');

        } else {
            /* github */
            url = remote.replace(':', '/');
            url = url.replace('git@', 'https://');
            url = url.replace('.git', '');
        }
    }
    if (url) {
        console.log(`open publish rempote web. Remote: ${url}`.green);
        open(url);
    } else {
        console.log(`open publish rempote error. Remote: ${remote}`.red);
    }
}
const GitTask = async function(env, message, isOPen, isSHow, cb) {
    const config = await GetConfigData(env);
    if (config.github) {
        if (message) {
            config.github['message'] = message;
        }
        /* 生成git命令 */
        const GitConfig = GitService.CreateGitOrder(config.github);
        /* 初始化git仓库 */
        const init = await GitService.GitInit();
        if (!init.status) {
            cb(init);
            return;
        }
        /* 切换分支 */
        const checkout = await GitService.GitRun(GitConfig.checkout);
        if (!checkout.status) {
            cb(checkout);
            return;
        }
        /* 添加远程分支 */
        const remote = await GitService.GitRun(GitConfig.remote);
        if (!remote.status) {
            cb(remote);
            return;
        }
        /* 拉取远程仓库 */
        const pull = await GitService.GitRun(GitConfig.pull);
        if (!pull.status) {
            cb(pull);
            return;
        }

        /* 在index.html 添加调试信息*/
        if (isSHow) {
            console.log('');
            console.log(`Start add console message`.cyan);
            const addinfo = await replace({
                files: [
                    config.outputPath + '/index.html'
                ],
                from: (file) => new RegExp('</head>', 'g'),
                to: `<script>console.log('${message?message:'获取调试信息失败'}')</script></head>`
            });
            console.log(`run add console message done`.green);
            console.log('');
        }

        /* 检查是否需要上传CDN */
        if (config.cdn) {
            let cndurl;
            if (config.cdn[env].url && config.cdn[env].ak && config.cdn[env].sk && config.cdn[env].bk) {
                cndurl = config.cdn[env].url;
                if (config.cdn[env].dirname) {
                    cndurl = cndurl ? cndurl + `${config.cdn[env].dirname}/` : '';
                }
                if (config.cdn[env].v) {
                    cndurl = cndurl ? cndurl + `${config.cdn[env].v}/` : '';
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

        /* 删除旧的文件并拷贝新的build文件 */
        const copy = await GitService.GitCopy(config.outputPath, config.github.dirname);
        if (!copy.status) {
            cb(copy);
            return;
        }
        /* 保存修改信息 */
        const add = await GitService.GitRun(GitConfig.add);
        if (!add.status) {
            cb(add);
            return;
        }
        /* 是否要忽略一些文件 */
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
            /* 打开浏览器 */
            if (isOPen) {
                OpenRemote(config.github.remote);
            }
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