const ExecTool = require('../../libs/utils/exec.tool');
const publicPath = process.cwd();
const GitInit = async function () {
    const res = await ExecTool.run(`git init ./push`);
    return res;
}
const GitCopy = async function (path, dirname) {
    const order = dirname ? `cp -r ./${path}/* ./push/${dirname}` : `cp -r ./${path}/* ./push`;
    const res = await ExecTool.run(order);
    return res;
}
const GitRun = async function (order) {
    if (order) {
        const res = await ExecTool.run(order, `${publicPath}/push`);
        return res;
    }
    return {
        status: false
    }
}
const GitClean = async function () {
    const res = await ExecTool.run(`rm -rf push`);
    return res;
}

const CreateGitOrder = function (config) {
    const cb = {
        add: `git add -A`,
        reset: '',
        checkout: `git checkout -b ${config.branch}`,
        commit: `git commit -m ${JSON.stringify(new Date())}`,
        remote: `git remote add origin ${config.remote}`,
        pull: `git pull origin ${config.branch}`,
        push: `git push origin ${config.branch}`
    }
    if (config.ignore && config.ignore.length > 0) {
        cb.reset = `git reset ` + '\\' + config.ignore.join(` `);
    }
    return cb;
}
module.exports.GitInit = GitInit;
module.exports.GitCopy = GitCopy;
module.exports.GitRun = GitRun;
module.exports.GitClean = GitClean;
module.exports.CreateGitOrder = CreateGitOrder;